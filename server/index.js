require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: [
      "https://blog-zone-web.netlify.app",
      "http://localhost:5173",
      "https://meta-blog-app.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("MetaBlog server is Running");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjx1mmk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//* token verification middleware
const verifyToken = async (req, res, next) => {
  const token = await req.cookies?.token;
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).send("Invalid Token");
  }
};

async function run() {
  try {
    app.get("/", (req, res) => {
      res.send("MetaBlog Server is Running");
    });

    // ! Database collection
    const blogsCollection = client.db("MetaBlogDB").collection("allBlogs");
    const usersCollection = client.db("MetaBlogDB").collection("users");
    const reactionsCollection = client.db("MetaBlogDB").collection("reactions");
    const postsCollection = client.db("MetaBlogDB").collection("posts");

    //!  auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 3600000,
        })
        .send({ success: true });
    });

    // remove cookie from the browser

    app.post("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //!  blogs related api

    // ? search api
    app.get("/blogs/search", async (req, res) => {
      const regexPattern = new RegExp(req.query.include, "i");
      try {
        const blogs = await blogsCollection
          .find({ title: regexPattern })
          .project({ title: 1 })
          .toArray();
        return res
          .status(200)
          .send({ success: true, total: blogs.length, data: blogs });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ?recent blog api

    app.get("/blogs/recent", async (req, res) => {
      try {
        const blogs = await blogsCollection
          .find()
          .project({ authorEmail: 0 })
          .sort({ published: -1 })
          .limit(9)
          .toArray();
        return res.status(200).send({ total: blogs.length, data: blogs });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? all blogs api

    app.get("/blogs", async (req, res) => {
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
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? create blog api

    app.post("/blogs", async (req, res) => {
      try {
        const blog = req.body;
        const result = await blogsCollection.insertOne(blog);
        return res.status(201).send(result);
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.get("/blogs/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await blogsCollection.findOne(query);

        return res.status(200).send({ success: true, data: result });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? update blog api

    app.patch("/blogs/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        // search the blog that is going to be updated

        const searchedBlog = await blogsCollection.findOne(query);

        // verify authorId of the searched blog with the authorId of the user

        if (req.user.userId !== searchedBlog.authorId) {
          return res.status(403).send({ message: "Unauthorized access" });
        }

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
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ? delete blog api

    app.delete("/blogs/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        // search the blog that is going to be deleted

        const searchedBlog = await blogsCollection.findOne(query);

        // verify authorId of the searched blog with the authorId of the user

        if (req.user.userId !== searchedBlog.authorId) {
          return res.status(403).send({ message: "Unauthorized access" });
        }

        const result = await blogsCollection.deleteOne(query);
        return res.status(200).send(result);
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ! users related api

    app.post("/users", async (req, res) => {
      try {
        const user = req.body;

        const userExists = await usersCollection.findOne({ email: user.email });
        if (userExists) {
          return res.send({ message: "User already exists" });
        }

        const result = await usersCollection.insertOne(user);
        return res.status(201).send(result);
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        return res.status(200).send({ success: true, data: users });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.get("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { uid: id };
        const user = await usersCollection.findOne(query, {
          projection: { email: 0, _id: 0 },
        });

        return res.status(200).send({ success: true, data: user });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.put("/users/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { uid: id };
        const user = req.body;

        if (req.user.userId !== id) {
          return res.status(403).send({ message: "Unauthorized access" });
        }

        if (req.body.bio) {
          const result = await usersCollection.updateOne(query, {
            $set: { bio: user.bio },
          });
          return res.status(200).send({ success: true, data: result });
        }

        const result = await usersCollection.updateOne(query, { $set: user });
        return res.status(200).send({ success: true, data: result });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.delete("/users/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { uid: id };

        if (req.user.userId !== id) {
          return res.status(403).send({ message: "Unauthorized access" });
        }

        const result = await usersCollection.deleteOne(query);
        return res.status(200).send({ success: true, data: result });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    // ! Likes related api

    app.post("/reactions", verifyToken, async (req, res) => {
      try {
        const userId = req.user.userId;
        const postId = req.body.postId;
        const isLike = req.body.isLike;

        let like = 0;
        let dislike = 0;

        if (isLike) {
          (like = 1), (dislike = 0);
        } else {
          (like = 0), (dislike = 1);
        }

        const existingReaction = await reactionsCollection.findOne({
          userId,
          postId,
        });
        if (existingReaction) {
          if (existingReaction.userId !== userId) {
            return res.status(403).send({ message: "Unauthorized access" });
          }
          await reactionsCollection.updateOne(
            { _id: existingReaction._id },
            {
              $set: {
                like,
                dislike,
              },
            }
          );
        } else {
          const reaction = {
            userId,
            postId,
            like,
            dislike,
          };
          await reactionsCollection.insertOne(reaction);
        }
        return res
          .status(201)
          .send({ success: true, message: "Reaction added" });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    app.get("/reactions/:id", verifyToken, async (req, res) => {
      try {
        const postId = req.params.id;
        const userId = req.user.userId;

        const result = await reactionsCollection.findOne({ userId });

        const reactionsCursor = await reactionsCollection.aggregate([
          {
            $match: { postId },
          },
          {
            $group: {
              _id: null,
              likes: { $sum: "$like" },
              dislikes: { $sum: "$dislike" },
            },
          },
        ]);

        const reactionsArray = await reactionsCursor.toArray();
        const reactions = await reactionsArray[0];
        return res
          .status(200)
          .send({ success: true, data: { result, reactions } });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    });

    await client.db("admin").command({ ping: 1 });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on: http://localhost:${port}`);
});
