const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  };

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const { _id } = await Users.findByEmail(decoded.email);

    req.user = { _id };

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};