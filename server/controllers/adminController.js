const AllBlogs = require("../models/AllBlogs");
const User = require("../models/User");
const isAdmin = require("../utils/checkAdmin");

const checkAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await isAdmin(id);
    return res.status(200).send({ success: true, isAdmin: result });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.body.role;
    const result = await User.findOneAndUpdate({ uid: id }, { role: role });
    return res.status(200).send({
      success: true,
      message: "Role updated successfully",
      result: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findOneAndDelete({ uid: id });
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      result: result,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const blogs = await AllBlogs.find()
      .limit(limit)
      .skip(skip)
      .sort({ published: -1 });

    if (blogs.length === 0)
      return res.status(404).json({ error: "No blogs found" });

    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ data: "Server Error" });
  }
};

const totalBlogsCount = async (req, res) => {
  try {
    const count = await AllBlogs.countDocuments();
    const totalPage = await Math.ceil(count / 5);
    return res.status(200).json({ success: true, data: totalPage });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  checkAdmin,
  changeUserRole,
  deleteUser,
  getAllBlogs,
  totalBlogsCount,
};
