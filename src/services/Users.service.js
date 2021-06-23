const User = require('../models/Users.model');

module.exports = {
  create: async (name, email, password) => {
    let user = await User.findOne({ email });

    if (user) return;

    await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    user = await User.findOne({ email });

    const { password: user_password, ...new_user } = user._doc;

    return new_user;
  }
};