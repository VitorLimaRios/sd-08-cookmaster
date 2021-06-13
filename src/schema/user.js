const joi = require('joi');

const ERROR_MESSAGE = 'Invalid entries. Try again.';

module.exports = joi.object({
  name: joi
    .string()
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .required(),
})
  .messages({
    'any.required': ERROR_MESSAGE,
    'string.email': ERROR_MESSAGE
  });
