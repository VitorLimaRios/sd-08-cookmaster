const UserModel = require('../models/userModel');
const ErrorMessages = require('../messages/errorMessages');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../../error/customError');

const validateEmailIsRequire = (email) => {
  if (!email || typeof email !== 'string') {    
    throw new CustomError(
      ErrorMessages.loginFieldsRequired,
      StatusCode.UNAUTHORIZED,
    );
  }
};

const validatePasswordIsRequire = (password) => {
  if (!password || typeof password !== 'string') {    
    throw new CustomError(
      ErrorMessages.loginFieldsRequired,
      StatusCode.UNAUTHORIZED,
    );
  }
};

const validateLoginPassword = async (email, password) => {
  const user = await UserModel.findByEmail(email);
  if (!user || user.password !== password) {
    throw new CustomError(
      ErrorMessages.invalidLogin,
      StatusCode.UNAUTHORIZED,
    );
  }
};

module.exports = {
  validateEmailIsRequire,
  validateLoginPassword,
  validatePasswordIsRequire,
};
