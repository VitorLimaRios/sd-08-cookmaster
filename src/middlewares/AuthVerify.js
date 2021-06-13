// validateJWT.js
const JWT = require('jsonwebtoken');
const msg = require('../validators/ErrorMessages');
const SECRET = 'meusegredosuperseguro';
const UserService = require('../services/UserService');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  const result = await UserService.verifyToken(token);
  if (result.code) {
    return res.status(result.code).json({ message: result.message });
  } else {
    next();
  }
};
