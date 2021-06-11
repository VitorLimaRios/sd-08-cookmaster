const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

const HTTP_UNATHOURIZED_STATUS = 401;

module.exports = {
  create: async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(HTTP_UNATHOURIZED_STATUS)
        .send({ message: 'All fields must be filled' });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return response
        .status(HTTP_UNATHOURIZED_STATUS)
        .send({ message: 'Incorrect username or password' });
    }

    const { password: user_password, ...user_auth } = user._doc;

    return jwt.sign(user_auth, process.env.JWT_SECRET);
  }
};