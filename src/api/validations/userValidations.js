const UserModel = require('../models/userModel');
const ErrorMessages = require('../messages/errorMessages');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../../error/customError');

const validateNameIsRequire = (userName) => {
  if (!userName || typeof userName !== 'string') {
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validatePasswordIsRequire = (password) => {
  if (!password || typeof password !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateEmailIsRequire = (email) => {
  if (!email || typeof email !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateEmailAlreadyExists = async (email) => {
  const user = await UserModel.findByEmail(email);
  if (user) {
    throw new CustomError(
      ErrorMessages.emailAlreadyExists,
      StatusCode.CONFLICT,
    );
  }
};

// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const validateEmailIsValid = (email) => {
  const isValid = /\S+@\S+\.\S+/.test(email);
  if (!isValid) {
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateIsUserAdmin = (userRole) => {
  if (userRole !== 'admin') {
    console.log(userRole);
    throw new CustomError(
      ErrorMessages.notUserAdmin,
      StatusCode.FORBIDDEN,
    );
  }
};

module.exports = {
  validateNameIsRequire,
  validateEmailIsRequire,
  validatePasswordIsRequire,
  validateEmailAlreadyExists,
  validateEmailIsValid,
  validateIsUserAdmin,
};
