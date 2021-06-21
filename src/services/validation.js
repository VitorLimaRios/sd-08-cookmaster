const joi = require('joi');

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().regex(EMAIL_REGEX).required(),
  password: joi.string().required(),
});

const recipeSchema = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

module.exports = { userSchema, recipeSchema };
