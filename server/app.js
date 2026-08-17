require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/db");

const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const reactionRouter = require("./routes/reactionRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

connectDb();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim());

  

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 3600,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/blogs", blogRouter);
app.use("/users", userRouter);
app.use("/jwt", authRouter);
app.use("/reactions", reactionRouter);
app.use("/admin", adminRouter);

module.exports = app;
