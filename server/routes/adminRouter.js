const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const verifyToken = require("../middlewares/tokenVerification");
const verifyAdmin = require("../middlewares/verifyAdmin");

const adminRouter = express.Router();

adminRouter.route("/").get(verifyToken, verifyAdmin, getAllUsers);

module.exports = adminRouter;
