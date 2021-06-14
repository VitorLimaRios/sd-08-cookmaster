const validateJWT = require('./validateJWT');
const validateUser = require('./validateUserAdmin');
const multer = require('./multer');
const validateAdmin = require('./validateAdmin');

module.exports = {
  validateJWT,
  validateUser,
  validateAdmin,
  multer,
};
