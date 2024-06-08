const AllBlogs = require("../models/AllBlogs");
const User = require("../models/User");
const isAdmin = require("../utils/checkAdmin");
const isAuthor = require("../utils/checkAuthor");

// ! to get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    let query = { status: "published" };
    if (req.query.category === "all") {
      query = { status: "published" };
    }
    if (req.query.category && req.query.category !== "all") {
      query.category = req.query.category;
    }

    const blogs = await AllBlogs.find(query)
      .sort({ published: -1 })
      .select("-content -_id -__v")
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      total: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// ! to get blog by id

const getBlogById = async (req, res) => {
  try {
    const blog = await AllBlogs.findOne({ slug: req.params.id });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// ! to get blogs by author id

const getBlogsByAuthorId = async (req, res) => {
  try {
    const blogs = await AllBlogs.find({ authorId: req.params.authorId })
      .sort({
        published: -1,
      })
      .select("-content -_id -__v -authorId");
    return res
      .status(200)
      .json({ success: true, total: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// ! to create a blog

const createBlog = async (req, res) => {
  try {
    const blog = await AllBlogs.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// ! to update a blog

const updateBlog = async (req, res) => {
  try {
    const Author = await isAuthor(req.user.userId);

    if (!Author) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this blog" });
    }

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

// ! to delete a blog

const deleteBlog = async (req, res) => {
  try {
    const Author = await isAuthor(req.user.userId);
    const Admin = await isAdmin(req.user.userId);

    if (Author || Admin) {
      const blog = await AllBlogs.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, data: blog });
    }

    return res
      .status(403)
      .json({ error: "You are not authorized to delete this blog" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// ! to get recent blogs

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

// ! to get searched blog by title

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

// ! to get stats of the current user

const getStats = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const id = req.user.userId;

    const user = await User.findOne({ uid: id });

    let stats = [];

    if (user) {
      const statsArray = await AllBlogs.aggregate([
        {
          $match: { authorId: id },
        },
        {
          $group: {
            _id: "$authorId",
            total: { $sum: 1 },
            published: {
              $sum: {
                $cond: [{ $eq: ["$status", "published"] }, 1, 0],
              },
            },
            draft: {
              $sum: {
                $cond: [{ $eq: ["$status", "draft"] }, 1, 0],
              },
            },
          },
        },
      ]);

      stats = await statsArray[0];

      if (!stats)
        return res
          .status(200)
          .json({ success: true, data: { total: 0, published: 0, draft: 0 } });
    }

    return res.status(200).json({ success: true, data: stats,});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//  ! to get total number of pages of published blogs
const getTotalBlogsCount = async (req, res) => {
  try {
    let query = { status: "published" };

    if (req.query.category === "all") {
      query = { status: "published" };
    }
    if (req.query.category && req.query.category !== "all") {
      query.category = req.query.category;
    }

    const result = await AllBlogs.countDocuments(query);
    const totalPage = await Math.ceil(result / 9);
    return res.status(200).json({ success: true, data: totalPage });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
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
  getStats,
  getTotalBlogsCount,
};
