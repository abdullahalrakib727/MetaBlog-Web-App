const User = require("../models/User");

//* Check if the user is an admin

const isAdmin = async (id) => {
  const query = { uid: id };
  const user = await User.findOne(query).select("role");
  if (user.role === "admin") {
    return true;
  }
  return false;
};

module.exports = isAdmin;
