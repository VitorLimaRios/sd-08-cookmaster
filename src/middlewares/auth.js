const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
const secret = require('../data/secret');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(createError('jwt malformed', 'missing_token'));
  
  let user;
  try {
    user = jwt.verify(token, secret);
  } catch (error) {
    console.log(error.message);
    return next(createError(error.message, 'invalid_token'));
  }

  const { id, email, role } = user;
  
  req.user = { id, email, role };

  next();
};
