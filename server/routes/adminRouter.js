const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const verifyToken = require("../middlewares/tokenVerification");

const adminRouter = express.Router();

adminRouter.route("/").get(verifyToken, getAllUsers);

module.exports = adminRouter;
