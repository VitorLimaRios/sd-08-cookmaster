const Joi = require('@hapi/joi');

const ERROR = 'Incorrect username or password';

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .message(ERROR)
    .required(),
  password: Joi
    .string()
    .required()
}).messages({ 'any.required': 'All fields must be filled' });

module.exports = loginSchema;