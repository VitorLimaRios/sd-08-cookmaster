const jwt = require('jsonwebtoken');
const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const SECRET_KEY = 'SEGREDO';
const responseFormat = (code, response) => ({ code, response });

const validateRecipeCreation = (recipeData) => {
  const { blank } = validations;
  const { badRequest } = statusCode;
  const { invalidEntries } = errors;

  const { name, ingredients, preparation } = recipeData;

  switch (true) {
  case blank(name):
  case blank(ingredients):
  case blank(preparation):
    return responseFormat(badRequest, invalidEntries);
  };

  return null;
};

const validateToken = (token) => {
  const { blank } = validations;
  const { unauthorized } = statusCode;
  const { jwtMalformed, missingToken } = errors;

  if (blank(token)) return responseFormat(unauthorized, missingToken);

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return responseFormat(unauthorized, jwtMalformed);
  };
};

const validateId = (id) => {
  const { invalidId } = validations;
  const { notFound } = statusCode; 
  const { recipeNotFound } = errors;

  if (invalidId(id)) return responseFormat(notFound, recipeNotFound);
  return null;
};

const validateRecipe = (recipe) => {
  const { notFound } = statusCode; 
  const { recipeNotFound } = errors;

  if (!recipe) return responseFormat(notFound, recipeNotFound);
  return null;
};

module.exports = {
  validateId,
  validateRecipe,
  validateRecipeCreation,
  validateToken,
};
