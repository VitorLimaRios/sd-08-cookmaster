const Joi = require('joi');
const { INVALID_ENTRIES } = require('../../api/constants/statusMessages');

const joiValidation = Joi.object({
  name: Joi
    .string()
    .required()
    .messages({
      'string.empty': INVALID_ENTRIES,
      'string.base': INVALID_ENTRIES,
      'any.required': INVALID_ENTRIES
    }),

  email: Joi
    .string()
    .email()
    .required()
    .messages({
      'string.email': INVALID_ENTRIES,
      'any.required': INVALID_ENTRIES,
    }),
  
  password: Joi
    .string()
    .required()
    .messages({
      'string.base': INVALID_ENTRIES,
      'string.empty': INVALID_ENTRIES,
      'any.required': INVALID_ENTRIES,
    }),

});

module.exports = joiValidation;
