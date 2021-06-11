const ErrorMessages = require('../../error/errorMessages');
const CustomError = require('../../error/customError');

const BAD_REQUEST = 400;

const validateNameIsRequire = (userName) => {
  if (!userName || typeof userName !== 'string') {
    console.log(userName);
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

const validateIngredientsIsRequire = (ingredients) => {
  if (!ingredients || typeof ingredients !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

const validatePreparationIsRequire = (preparation) => {
  if (!preparation || typeof preparation !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

module.exports = {
  validateNameIsRequire,
  validateIngredientsIsRequire,
  validatePreparationIsRequire,
};
