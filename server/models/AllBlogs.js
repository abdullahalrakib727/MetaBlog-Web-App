const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Lifestyle",
      "Economy",
      "Technology",
      "Sports",
      "Business",
      "Travel",
    ],
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Date,
    default: Date.now,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
});

module.exports = mongoose.model("allBlogs", blogSchema, "allBlogs");
