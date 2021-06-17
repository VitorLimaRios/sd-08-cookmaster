const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFound');
const validations = require('./validations');
const jwtAuthentication = require('./jwtAuthentication');
const isAdmin = require('./isAdmin');
const isUserIdOrAdmin = require('./isUserIdOrAdmin');

module.exports = {
  errorHandler,
  notFoundHandler,
  validations,
  jwtAuthentication,
  isAdmin,
  isUserIdOrAdmin,
};
