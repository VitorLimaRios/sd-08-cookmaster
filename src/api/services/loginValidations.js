const UserModel = require('../models/userModel');
const ErrorMessages = require('../../error/errorMessages');
const CustomError = require('../../error/customError');

const UNAUTHORIZED = 401;

const validateEmailIsRequire = (email) => {
  if (!email || typeof email !== 'string') {    
    throw new CustomError(
      ErrorMessages.loginFieldsRequired,
      UNAUTHORIZED,
    );
  }
};

const validatePasswordIsRequire = (password) => {
  if (!password || typeof password !== 'string') {    
    throw new CustomError(
      ErrorMessages.loginFieldsRequired,
      UNAUTHORIZED,
    );
  }
};

const validateLoginPassword = async (email, password) => {
  const user = await UserModel.findByEmail(email);
  if (!user || user.password !== password) {
    throw new CustomError(
      ErrorMessages.invalidLogin,
      UNAUTHORIZED,
    );
  }
};

module.exports = {
  validateEmailIsRequire,
  validateLoginPassword,
  validatePasswordIsRequire,
};
