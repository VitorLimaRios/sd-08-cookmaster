const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');
const { secret } = require('../services/users');
const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(UNAUTHORIZED).json({message: 'jwt malformed'});
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await usersModel.findUser(decoded.data.email);

    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'jwt malformed'});
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed'});
  }
};
