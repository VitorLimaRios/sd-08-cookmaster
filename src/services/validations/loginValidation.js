const Joi = require('joi');
const {
  ALL_FIELDS_REQUIRED, INCORRECT_USER_OR_PASS
} = require('../../api/constants/statusMessages');

const MINIMUM_PASSWORD_LENGTH = 8;

const loginValidation = Joi.object({
  email: Joi
    .string()
    .email()
    .required()
    .messages({
      'string.base': ALL_FIELDS_REQUIRED,
      'string.email': INCORRECT_USER_OR_PASS,
      'any.required': ALL_FIELDS_REQUIRED,
    }),
  
  password: Joi
    .string()
    // .min(MINIMUM_PASSWORD_LENGTH)
    .required()
    .messages({
      'string.base': ALL_FIELDS_REQUIRED,
      'string.min': INCORRECT_USER_OR_PASS,
      'any.required': ALL_FIELDS_REQUIRED,
    }),
  
});

module.exports = loginValidation;
