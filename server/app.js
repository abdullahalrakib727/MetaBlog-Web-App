require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/db");

const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const reactionRouter = require("./routes/reactionRouter");
const userRouter = require("./routes/userRouter");

const app = express();

connectDb();

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

app.use("/blogs", blogRouter);
app.use("/users", userRouter);
app.use("/jwt", authRouter);
app.use("/reactions", reactionRouter);

module.exports = app;