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
    const blogs = await AllBlogs.find();
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { checkAdmin, changeUserRole, deleteUser, getAllBlogs};
