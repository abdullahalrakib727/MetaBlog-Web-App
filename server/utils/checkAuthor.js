const AllBlogs = require("../models/AllBlogs");

const isAuthor = async (id) => {
  const query = { authorId: id };
  const user = await AllBlogs.findOne(query).select("authorId -_id");
  if (user.authorId === id) {
    return true;
  }
  return false;
};

module.exports = isAuthor;
