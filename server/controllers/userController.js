
const User = require("../models/User");

// ! get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send({ success: true, data: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// ! create user

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ uid: req.body.uid });

    if (existingUser) {
      return res.status(204).send({ message: "User already exists" });
    }

    const user = new User(req.body);
    const result = await user.save();
    return res.status(201).send(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
};
//  ! get current logged user

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { uid: id };
    const user = await User.findOne(query).select("-email -role -_id");

    return res.status(200).send({ success: true, data: user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// ! update user

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { uid: id };
    const updates = req.body.bio ? { bio: req.body.bio } : req.body;

    if (req.user.userId !== id) {
      return res.status(403).send({ message: "Unauthorized access" });
    }

    const result = await User.updateOne(query, { $set: updates });
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// ! delete user

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { uid: id };


    if (role === "admin" || req.user.userId === id) {
      const result = await User.deleteOne(query);
      return res.status(200).send({ success: true, data: result });
    }
    return res.status(403).send({ message: "Unauthorized access" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
