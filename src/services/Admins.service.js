const User = require('../models/Users.model');

module.exports = {
  create: async (name, email, password) => {
    let admin = await User.findOne({ email });

    if (admin) return;

    await User.create({
      name,
      email,
      password,
      role: 'admin'
    });

    admin = await User.findOne({ email });

    const { password: admin_password, ...new_admin } = admin._doc;

    return new_admin;
  }
};