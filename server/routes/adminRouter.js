const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const verifyToken = require("../middlewares/tokenVerification");
const verifyAdmin = require("../middlewares/verifyAdmin");

const {
  checkAdmin,
  changeUserRole,
  deleteUser,
  getAllBlogs,
  totalBlogsCount,
  changeBlogStatus,
  deleteBlog,
} = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.route("/users").get(verifyToken, verifyAdmin, getAllUsers);

adminRouter.route("/page-count").get(verifyToken, verifyAdmin, totalBlogsCount);

adminRouter.route("/blogs").get(verifyToken, verifyAdmin, getAllBlogs);

adminRouter.route("/:id").get(verifyToken, checkAdmin);

adminRouter
  .route("/users/:id")
  .patch(verifyToken, verifyAdmin, changeUserRole)
  .delete(verifyToken, verifyAdmin, deleteUser);

adminRouter
  .route("/blogs/:id")
  .patch(verifyToken, verifyAdmin, changeBlogStatus)
  .delete(verifyToken, verifyAdmin, deleteBlog);

module.exports = adminRouter;
