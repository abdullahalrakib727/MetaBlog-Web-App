const express = require("express");
const { addReact, getReact } = require("../controllers/reactionController");
const verifyToken = require("../middlewares/tokenVerification");

const reactionRouter = express.Router();

reactionRouter.route("/").post(verifyToken, addReact);

reactionRouter.route("/:id").get(verifyToken, getReact);

module.exports = reactionRouter;
