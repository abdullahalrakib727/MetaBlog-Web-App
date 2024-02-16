import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const port: string | Number = process.env.PORT || 5000;

// environment variables

// middleware
app.use(
  cors({
    origin: [
      "https://blog-zone-web.netlify.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://meta-blog-app.vercel.app",
      "https://blog-website-server-theta.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Blog Zone Server is Running");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjx1mmk.mongodb.net/?retryWrites=true&w=majority`;
console.log("connected to database");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// verify token

// const verifyToken = async (req, res, next) => {
//   const token = req?.cookies?.token;
//   // console.log('token inside verify token',token);

//   if (!token) {
//     res.status(401).send({ message: "unauthorized" });
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
//     // error
//     if (error) {
//       console.log(error);
//       return res.status(401).send({ message: "unauthorized" });
//     }

//     console.log(decoded);
//     // decoded
//     req.user = decoded;
//     next();
//   });
// };

async function run() {
  try {
    app.get("/", (req, res) => {
      res.send("Blog Zone Server is Running");
    });

    const blogsCollection = client.db("MetaBlogDB").collection("allBlogs");
    const CommentsCollection = client.db("MetaBlogDB").collection("comments");
    const wishlistCollection = client.db("MetaBlogDB").collection("wishlist");

    //  auth related api
    app.post("/jwt", async (req: Request, res: Response) => {
      const user = req.body;

      const accessToken = process.env.ACCESS_TOKEN;

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const token = jwt.sign(user, accessToken, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.post("/logout", async (req: Request, res: Response) => {
      const user = req.body;
      console.log(user);
      res.clearCookie("token", { maxAge: 0 }).send({ message: true });
    });

    //*  blogs related api

    // ? search api
    app.get("/blogs/search", async (req: Request, res: Response) => {
      const regexPattern = new RegExp(req.query.include as string, "i");
      try {
        const blogs = await blogsCollection
          .find({ title: regexPattern })
          .project({ title: 1 })
          .toArray();
        return res
          .status(200)
          .send({ success: true, total: blogs.length, data: blogs });
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ?recent blog api

    app.get("/blogs/recent", async (req: Request, res: Response) => {
      try {
        const blogs = await blogsCollection
          .find()
          .project({ authorEmail: 0 })
          .sort({ published: -1 })
          .limit(9)
          .toArray();
        return res.status(200).send({ total: blogs.length, data: blogs });
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? all blogs api

    app.get("/blogs", async (req: Request, res: Response) => {
      try {
        let query = {};

        if (req.query?.authorId) {
          query = { authorId: req.query.authorId };
        }

        if (req.query?.category) {
          query = { category: req.query.category };
        }

        const blogs = await blogsCollection
          .find(query)
          .project({ authorEmail: 0 })
          .sort({ published: -1 })
          .toArray();
        return res
          .status(200)
          .json({ success: true, total: blogs.length, data: blogs });
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? create blog api

    app.post("/blogs", async (req: Request, res: Response) => {
      try {
        const blog = req.body;
        const result = await blogsCollection.insertOne(blog);
        return res.status(201).send(result);
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.get("/blogs/:id", async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await blogsCollection.findOne(query);
        return res.status(200).send({ success: true, data: result });
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? update blog api

    app.patch("/blogs/:id", async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedBlog = req.body;
        const blog = {
          $set: {
            title: updatedBlog.title,
            photoUrl: updatedBlog.photoUrl,
            category: updatedBlog.category,
            content: updatedBlog.content,
          },
        };
        const result = await blogsCollection.updateOne(query, blog, options);
        return res.status(200).send({ success: true, data: result });
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? delete blog api

    app.delete("/blogs/:id", async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await blogsCollection.deleteOne(query);
        return res.status(200).send(result);
      } catch (error: string | any) {
        return res.status(500).send({ message: error.message });
      }
    });

    //  comments related api

    app.post("/comments", async (req: Request, res: Response) => {
      const comment = req.body;
      const result = await CommentsCollection.insertOne(comment);
      res.send(result);
    });

    app.get("/comments", async (req: Request, res: Response) => {
      const cursor = CommentsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.patch("/comments/:id", async (req: Request, res: Response) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const updatedComment = req.body;
      const comment = {
        $set: {
          comment: updatedComment.comment,
        },
      };
      const result = await CommentsCollection.updateOne(query, comment);
      res.send(result);
    });

    app.delete("/comments/:id", async (req: Request, res: Response) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await CommentsCollection.deleteOne(query);
      res.send(result);
    });

    //  wishlist related api

    // app.post("/wishlist", async (req: Request, res: Response) => {
    //   const wishlist = req.body;
    //   const result = await wishlistCollection.insertOne(wishlist);
    //   res.send(result);
    // });

    // app.get("/wishlist", async (req: Request, res: Response) => {
    //   // if (req.query.email !== req.user.email) {
    //   //   return res.status(403).send({ message: "forbidden" });
    //   // }

    //   let query = {};
    //   if (req.query?.email) {
    //     query = { email: req.query.email };
    //   }
    //   const cursor = wishlistCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    // app.delete("/wishlist/:id", async (req: Request, res: Response) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await wishlistCollection.deleteOne(query);
    //   res.send(result);
    // });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on: http://localhost:${port}`);
});
