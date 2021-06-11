const User = require('../models/Users.model');

const REG_EX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const HTTP_CONFLICT_STATUS = 409;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  create: async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !REG_EX.test(email) || !password) {
      return response
        .status(HTTP_BAD_REQUEST_STATUS)
        .send({ message: 'Invalid entries. Try again.' });
    }

    let user = await User.findOne({ email });

    if (user) {
      return response
        .status(HTTP_CONFLICT_STATUS)
        .send({ message: 'Email already registered' });
    }

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