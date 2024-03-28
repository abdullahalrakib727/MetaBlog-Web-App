const User = require("../models/User");

const isUser = async (id) => {
  const query = { uid: id };
  const user = await User.findOne(query).select("uid -_id");
    if (user.uid === id) {
        return true;
    }
    return false;
}

module.exports = isUser;