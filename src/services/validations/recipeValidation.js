const Joi = require('joi');
const { INVALID_ENTRIES } = require('../../api/constants/statusMessages');

const recipeValidation = Joi.object({
  name: Joi
    .string()
    .required()
    .messages({
      'string.empty': INVALID_ENTRIES,
      'string.base': INVALID_ENTRIES,
      'any.required': INVALID_ENTRIES
    }),
  
  ingredients: Joi
    .string()
    .required()
    .messages({
      'string.empty': INVALID_ENTRIES,
      'string.base': INVALID_ENTRIES,
      'any.required': INVALID_ENTRIES
    }),

  preparation: Joi
    .string()
    .required()
    .messages({
      'string.empty': INVALID_ENTRIES,
      'string.base': INVALID_ENTRIES,
      'any.required': INVALID_ENTRIES
    }),
  
});

module.exports = recipeValidation;
