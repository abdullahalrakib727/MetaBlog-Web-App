const User = require("../models/User");

//* Check if the user is an admin

const isUser = async (id) => {
  const query = { uid: id };
  const user = await User.findOne(query).select("uid -_id");
    if (user.uid === id) {
        return true;
    }
    return false;
}

module.exports = isUser;