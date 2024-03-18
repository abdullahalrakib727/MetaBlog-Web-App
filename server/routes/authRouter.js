const express = require("express");
const { addToken, removeToken } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.route("/").post(addToken);

authRouter.route("/logout").post(removeToken);

module.exports = authRouter;
