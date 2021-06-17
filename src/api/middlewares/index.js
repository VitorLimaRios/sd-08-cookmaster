const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFound');
const validations = require('./validations');
const jwtAuthentication = require('./jwtAuthentication');
const isAdmin = require('./isAdmin');
const isUserIdOrAdmin = require('./isUserIdOrAdmin');
const addImage = require('./addImage');

module.exports = {
  errorHandler,
  notFoundHandler,
  validations,
  jwtAuthentication,
  isAdmin,
  isUserIdOrAdmin,
  addImage,
};
