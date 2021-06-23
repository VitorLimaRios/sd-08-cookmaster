const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  };

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await Users.findByEmail(decoded.email);

    delete user.password;

    req.user = user;

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};