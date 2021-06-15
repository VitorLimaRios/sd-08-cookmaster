const joi = require('joi');

const msg = 'Invalid entries. Try again.';

const validRecipes = joi.
  object({
    userId: joi
      .string()
      .required(),
    name: joi
      .string()
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
        'any.required': msg,
      })
      .required(),
    ingredients: joi
      .string()
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
        'any.required': msg,
      })
      .required(),
    preparation: joi
      .string()
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
        'any.required': msg,
      })
      .required(),
  });

module.exports = validRecipes;
