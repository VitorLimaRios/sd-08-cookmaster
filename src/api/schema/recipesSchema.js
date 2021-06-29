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
  const { unauthorized } = statusCode;
  const { jwtMalformed } = errors;
  try {
    const teste = jwt.verify(token, SECRET_KEY);
    return teste;
  } catch (err) {
    return responseFormat(unauthorized, jwtMalformed);
  };
};

module.exports = {
  validateRecipeCreation,
  validateToken,
};
