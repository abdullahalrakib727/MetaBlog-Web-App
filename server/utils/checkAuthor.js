const AllBlogs = require("../models/AllBlogs");

//* Check if the user is an author

const isAuthor = async (id) => {
  const query = { authorId: id };
  const user = await AllBlogs.findOne(query).select("authorId -_id");
  if (user.authorId === id) {
    return true;
  }
  return false;
};

module.exports = isAuthor;
