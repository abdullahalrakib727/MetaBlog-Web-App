const AllBlogs = require("../models/AllBlogs");

const getAllBlogs = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const blogs = await AllBlogs.find(query)
      .sort({ published: -1 })
      .select("-content -_id -__v -authorId");
    const filteredBlogs = await blogs.filter(
      (blog) => blog.status === "published"
    );
    return res.status(200).json({
      success: true,
      total: filteredBlogs.length,
      data: filteredBlogs,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await AllBlogs.findOne({ slug: req.params.id });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getBlogsByAuthorId = async (req, res) => {
  try {
    const blogs = await AllBlogs.find({ authorId: req.params.authorId }).sort({
      published: -1,
    }).select("-content -authorId -_id -__v -authorId");
    return res
      .status(200)
      .json({ success: true, total: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = await AllBlogs.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await AllBlogs.findOneAndUpdate({ slug: id }, req.body, {
      new: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, error: "No blog found to update" });
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await AllBlogs.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const getRecentBlogs = async (req, res) => {
  try {
    const blogs = await AllBlogs.find({ status: "published" })
      .sort({ published: -1 })
      .limit(6);
    return res
      .status(200)
      .json({ success: true, total: blogs.length, data: blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getSearchedBlog = async (req, res) => {
  const regexPattern = await new RegExp(req.query.include, "i");
  try {
    const blogs = await AllBlogs.find({ title: regexPattern });
    return res
      .status(200)
      .send({ success: true, total: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getBlogsByAuthorId,
  createBlog,
  updateBlog,
  deleteBlog,
  getRecentBlogs,
  getSearchedBlog,
};
