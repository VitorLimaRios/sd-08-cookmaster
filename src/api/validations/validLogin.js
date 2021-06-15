const joi = require('joi');

const msg = 'All fields must be filled';
const msg1 = 'Incorrect username or password';
const EIGHT = 8;

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
      .min(EIGHT)
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
        'string.min': msg1,
        'any.required': msg,
      })
      .required(),
  });

module.exports = validLogin;
