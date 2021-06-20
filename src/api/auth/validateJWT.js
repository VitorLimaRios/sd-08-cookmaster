const jwt = require('jsonwebtoken');
const userModel = require('../../models/users');

const secret = 'mypass';
const errorToken = 'jwt malformed';

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findEmail(decoded.data.email);
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: errorToken });
  }
};