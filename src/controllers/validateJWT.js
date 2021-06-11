const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const UNAUTHORIZED = 401;
const secret = 'publicSecretParadox';

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

  const decoded = jwt.verify(token, secret);
});
//TODO