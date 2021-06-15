const jwt = require('jsonwebtoken');

const usersModel = require('../models/users');

const secret = 'minhaSenhaCoockmaster';
const UNAUTHORIZED = 401;

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    };

    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findEmail(decoded.data.email);

    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = tokenValidation;
