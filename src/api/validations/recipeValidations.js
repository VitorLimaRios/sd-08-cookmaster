const ErrorMessages = require('../messages/errorMessages');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../../error/customError');
const { ObjectId } = require('mongodb');

const validateNameIsRequire = (userName) => {
  if (!userName || typeof userName !== 'string') {
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateIngredientsIsRequire = (ingredients) => {
  if (!ingredients || typeof ingredients !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validatePreparationIsRequire = (preparation) => {
  if (!preparation || typeof preparation !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateRecipeId = (id) => {
  if (!ObjectId.isValid((id))) {    
    throw new CustomError(
      ErrorMessages.recipeNotFound,
      StatusCode.NOT_FOUND
    );
  }
};

const validateRecipeNotFound = (recipe) => {
  if (!recipe) {    
    throw new CustomError(
      ErrorMessages.recipeNotFound,
      StatusCode.NOT_FOUND
    );
  }
};

module.exports = {
  validateNameIsRequire,
  validateIngredientsIsRequire,
  validatePreparationIsRequire,
  validateRecipeId,
  validateRecipeNotFound,
};
