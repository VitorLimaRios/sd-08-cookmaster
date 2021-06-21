const Joi = require('joi');

const MINLENGTHPASSWORD = 3;

const validateCredentialsData = (userData) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(MINLENGTHPASSWORD).required(),
  }).validate(userData);

const validateRecipeData = (recipeData) =>
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(recipeData);

module.exports = {
  validateCredentialsData,
  validateRecipeData,
};
