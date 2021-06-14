const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const secret = 'psiu!segredo';
const UNAUTHORIZED = 401;

const tokenValidation = async (req, res, next) => {
  try {

    if (!req.headers.authorization)
      return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findUser(decoded.data.email);

    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = tokenValidation;
