const ErrorMessages = require('../../error/errorMessages');
const CustomError = require('../../error/customError');
const { ObjectId } = require('mongodb');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

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

const validateRecipeId = (id) => {
  if (!ObjectId.isValid((id))) {    
    throw new CustomError(
      ErrorMessages.recipeNotFound,
      NOT_FOUND
    );
  }
};

const validateRecipeNotFound = (recipe) => {
  if (!recipe) {    
    throw new CustomError(
      ErrorMessages.recipeNotFound,
      NOT_FOUND
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
