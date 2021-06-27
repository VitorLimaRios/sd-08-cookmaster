const Joi = require('joi');

const message = 'Invalid entries. Try again.';

const userVerify = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).messages({
  ' string.empty': message,
  'any.required': message, 
  'string.email': message
});

module.exports = userVerify;