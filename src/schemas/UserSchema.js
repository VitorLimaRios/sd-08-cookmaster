const Joi = require('@hapi/joi');

const ERROR = 'Invalid entries. Try again.';

const userSchema = Joi.object({
  name: Joi
    .string()
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
}).messages({
  'any.required': ERROR,
  'string.email': ERROR
});

module.exports = userSchema;