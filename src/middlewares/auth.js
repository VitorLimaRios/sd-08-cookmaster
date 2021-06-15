const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const secret = 'secretPass';
const Unauthorized = 401;
const BadRequest = 400;

const validateToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res
      .status(BadRequest)
      .json({ message: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log('decoded:', decoded);
    const user = await userModel.findEmail(decoded.email);

    if (!user) {
      return res
        .status(Unauthorized)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(Unauthorized)
      .json({ message: err.message });
  }
};

module.exports = validateToken;
