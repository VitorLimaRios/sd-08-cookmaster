const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const recipesSchema = require('../schema/recipes');
const { secret } = require('../controllers/User');

module.exports = rescue((req, _res, next) => {
  const { error } = recipesSchema.validate(req.body);
  const token = req.headers['authorization'];

  if (error) {
    const err = { ...error, statusCode: 400, isJoi: true };
    return next(err);
  }

  if (!token) throw boom.unauthorized('missing auth token');

  jwt.verify(token, secret, (err, _decoded) => {
    if (err) throw boom.unauthorized('jwt malformed');
  });

  next();
});