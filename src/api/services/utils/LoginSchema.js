const Joi = require('joi');

const message = 'All fields must be filled';

const loginVerify = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).messages({
  ' string.empty': message,
  'any.required': message, 
  'string.email': 'Incorrect username or password'
});

module.exports = loginVerify;