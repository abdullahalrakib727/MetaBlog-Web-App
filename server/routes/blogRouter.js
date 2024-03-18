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
blogRouter.route("/author/:authorId").get(getBlogsByAuthorId);

blogRouter.route("/").get(getAllBlogs).post(createBlog);

blogRouter
  .route("/:id")
  .get(verifyToken, getBlogById)
  .put(verifyToken, updateBlog)
  .delete(verifyToken, deleteBlog);


module.exports = blogRouter;
