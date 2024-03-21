const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    ("MongoDB connected");
  } catch (error) {
    "error", error;
  }
};

module.exports = connectDb;
