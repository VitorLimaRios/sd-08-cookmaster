const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const { code, message } = require('../helpers/messages');

const secret = 'seusecretdetoken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(code.UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  const decoded = jwt.verify(token, secret);
  next();
};

module.exports = validateJWT;
