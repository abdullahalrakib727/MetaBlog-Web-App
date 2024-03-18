const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("users", userSchema, "users");
