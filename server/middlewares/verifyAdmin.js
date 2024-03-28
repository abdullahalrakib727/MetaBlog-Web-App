const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ uid: req.user.userId });
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "You are not authorized to access this route" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = verifyAdmin;
