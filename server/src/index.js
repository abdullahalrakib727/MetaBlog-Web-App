import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Blog Zone Server is Running");
});
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjx1mmk.mongodb.net/?retryWrites=true&w=majority`;
console.log("connected to database");
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function run() {
    try {
        app.get("/", (req, res) => {
            res.send("Blog Zone Server is Running");
        });
        const blogsCollection = client.db("MetaBlogDB").collection("allBlogs");
        const CommentsCollection = client.db("MetaBlogDB").collection("comments");
        const wishlistCollection = client.db("MetaBlogDB").collection("wishlist");
        app.post("/jwt", async (req, res) => {
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
        app.post("/logout", async (req, res) => {
            const user = req.body;
            console.log(user);
            res.clearCookie("token", { maxAge: 0 }).send({ message: true });
        });
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
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
        app.get("/blogs/recent", async (req, res) => {
            try {
                const blogs = await blogsCollection
                    .find()
                    .project({ authorEmail: 0 })
                    .sort({ published: -1 })
                    .limit(9)
                    .toArray();
                return res.status(200).send({ total: blogs.length, data: blogs });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
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
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
        app.post("/blogs", async (req, res) => {
            try {
                const blog = req.body;
                const result = await blogsCollection.insertOne(blog);
                return res.status(201).send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
        app.get("/blogs/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await blogsCollection.findOne(query);
                return res.status(200).send({ success: true, data: result });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
        app.patch("/blogs/:id", async (req, res) => {
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
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
        app.delete("/blogs/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await blogsCollection.deleteOne(query);
                return res.status(200).send(result);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
        app.post("/comments", async (req, res) => {
            const comment = req.body;
            const result = await CommentsCollection.insertOne(comment);
            res.send(result);
        });
        app.get("/comments", async (req, res) => {
            const cursor = CommentsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });
        app.patch("/comments/:id", async (req, res) => {
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
        app.delete("/comments/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await CommentsCollection.deleteOne(query);
            res.send(result);
        });
        await client.db("admin").command({ ping: 1 });
    }
    finally {
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`server running on: http://localhost:${port}`);
});
