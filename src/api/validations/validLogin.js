const joi = require('joi');

const msg = 'All fields must be filled';
const msg1 = 'Incorrect username or password';

const validLogin = joi.
  object({
    email: joi
      .string()
      .email()
      .messages({ 
        'string.base': msg,
        'string.email': msg1,
        'any.required': msg,
      })
      .required(),
    password: joi
      .string()
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
        'any.required': msg,
      })
      .required(),
  });

module.exports = validLogin;
