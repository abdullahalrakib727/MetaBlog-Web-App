const express = require("express");

const verifyToken = require("../middlewares/tokenVerification");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByAuthorId,
  getRecentBlogs,
  getSearchedBlog,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.route("/search").get(getSearchedBlog);
blogRouter.route("/recent").get(getRecentBlogs);
blogRouter.route("/author/:authorId").get(verifyToken, getBlogsByAuthorId);

blogRouter.route("/").get(getAllBlogs).post(verifyToken, createBlog);

blogRouter
  .route("/:id")
  .get(verifyToken, getBlogById)
  .patch(verifyToken, updateBlog)
  .delete(verifyToken, deleteBlog);

module.exports = blogRouter;
