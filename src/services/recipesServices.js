const joi = require('joi');
const model = require('../models/recipesModel');
const jwt = require('../auth/validateJWT');

const INVALID_ENTRIES = 'Invalid entries. Try again.';
const JWT_MALFORMED = 'jwt malformed';
const BAD = 400;
const UNAUTHORIZED = 401;

const recipeSchema = joi.object({
  name: joi
    .string()
    .required(),
  ingredients: joi
    .string()
    .required(),
  preparation: joi
    .string()
    .required(),
});

const create = async(recipe, token) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) {
    return {
      verifyError: true,
      error: { message: INVALID_ENTRIES },
      status: BAD,
    };
  }

  const data = await jwt.verifyToken(token);
  if (!data) {
    return {
      verifyError: true,
      error: { message: JWT_MALFORMED },
      status: UNAUTHORIZED,
    };
  }

  const resp = await model.create({ ...recipe, userId: data.id });
  return { recipe: resp };
};

const getAll = async() => model.getAll();

module.exports = {
  create,
  getAll,
};
