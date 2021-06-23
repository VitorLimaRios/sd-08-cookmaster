const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

module.exports = {
  create: async (email, password) => {
    const user = await User.findOne({ email, password });

    if (!user) return;

    const { password: user_password, ...user_auth } = user._doc;

    return jwt.sign(user_auth, process.env.JWT_SECRET);
  }
};