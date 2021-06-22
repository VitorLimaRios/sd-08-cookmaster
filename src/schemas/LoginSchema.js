const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .required()
}).messages({ 'any.required': 'All fields must be filled' });

module.exports = loginSchema;