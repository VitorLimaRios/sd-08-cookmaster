const jwt = require('jsonwebtoken');
const secret = 'mysecrettoken';
const {code, message} = require('../helper/status');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if(!token) {
      return res.status(code.UNAUTHORIZED).json({ message: message.missing_token });
    } else(
      jwt.verify(token, secret)
    );

    next();
  } catch (err) {
    res.status(code.UNAUTHORIZED).json({ message: message.jwt_malformed });
  }
};