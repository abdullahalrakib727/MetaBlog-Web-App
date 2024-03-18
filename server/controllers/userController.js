const allUsers = require("../models/User");

// ! get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await allUsers.find();
    return res.status(200).send({ success: true, data: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// ! create user

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const userExists = await allUsers.findOne({ email: user.email });
    if (userExists) {
      return res.send({ message: "User already exists" });
    }

    const result = await allUsers.insertOne(user);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//  ! get current logged user

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { uid: id };
    const user = await allUsers.findOne(query).select("-email -role -_id");

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
    const user = req.body;

    if (req.user.userId !== id) {
      return res.status(403).send({ message: "Unauthorized access" });
    }

    if (req.body.bio) {
      const result = await allUsers.updateOne(query, {
        $set: { bio: user.bio },
      });
      return res.status(200).send({ success: true, data: result });
    }

    const result = await allUsers.updateOne(query, { $set: user });
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

    if (req.user.userId !== id) {
      return res.status(403).send({ message: "Unauthorized access" });
    }

    const result = await allUsers.deleteOne(query);
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
