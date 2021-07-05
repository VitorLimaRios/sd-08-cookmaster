const jwt = require('jsonwebtoken');
const { auth } = require('../utils');

const secret = 'senhasecretamentedificil';

module.exports = (req, _res, next) => {
  const token = req.headers['authorization'];
  if(!req.headers.authorization) {
    const error = new Error('missing auth token');
    error.statusCode = 401;
    next(error);
  }
  jwt.verify(token, secret, auth);
  next();
};
