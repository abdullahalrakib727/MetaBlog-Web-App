const User = require("../models/User");

const isAdmin = async (id) => {
  const query = { uid: id };
  const user = await User.findOne(query).select("role");
  if (user.role === "admin") {
    return true;
  }
  return false;
};

module.exports = isAdmin;
