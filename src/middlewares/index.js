const validateJWT = require('./validateJWT');
const validateUser = require('./validateUserAdmin');
const multer = require('./multer');

module.exports = {
  validateJWT,
  validateUser,
  multer
};
