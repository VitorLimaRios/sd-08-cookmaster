const jwt = require('jsonwebtoken');
const secret = 'mysecrettoken';
const {code, message} = require('../helper/status');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(code.UNAUTHORIZED).json({ message: message.jwt_malformed });
  }
};