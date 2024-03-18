const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = await req.cookies?.token;
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).send("Invalid Token");
  }
};

module.exports = verifyToken;
