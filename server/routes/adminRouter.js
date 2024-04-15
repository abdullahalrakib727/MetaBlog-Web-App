const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const verifyToken = require("../middlewares/tokenVerification");
const verifyAdmin = require("../middlewares/verifyAdmin");
const {
  checkAdmin,
  changeUserRole,
  deleteUser,
  getAllBlogs,
} = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.route("/users").get(verifyToken, verifyAdmin, getAllUsers);
adminRouter.route("/blogs").get(verifyToken, verifyAdmin, getAllBlogs);
adminRouter.route("/:id").get(verifyToken, checkAdmin);
adminRouter
  .route("/users/:id")
  .patch(verifyToken, verifyAdmin, changeUserRole)
  .delete(verifyToken, verifyAdmin, deleteUser);

module.exports = adminRouter;
