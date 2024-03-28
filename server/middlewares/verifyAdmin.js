const User = require("../models/User");

const verifyAdmin = async (id) => {
  const user = await User.findOne({ uid: id });

  return user.role;
};

module.exports = verifyAdmin;
