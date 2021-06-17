const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFound');
const validations = require('./validations');
const jwtAuthentication = require('./jwtAuthentication');

module.exports = {
  errorHandler,
  notFoundHandler,
  validations,
  jwtAuthentication,
};
