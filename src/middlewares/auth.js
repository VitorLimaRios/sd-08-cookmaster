const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { secret } = require('../controllers/User');

module.exports = rescue((req, _res, next) => {
  const token = req.headers['authorization'];

  if (!token) throw boom.unauthorized('missing auth token');

  jwt.verify(token, secret, (err, _decoded) => {
    if (err) throw boom.unauthorized('jwt malformed');
  });

  next();
});