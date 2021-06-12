const joi = require('joi');

const msg = 'Invalid entries. Try again.';

const valid = joi.
  object({
    name: joi
      .string()
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
        'any.required': msg,
      })
      .required(),
    email: joi
      .string()
      .email()
      .messages({ 
        'string.base': msg,
        'string.email': msg,
        'any.required': msg,
      })
      .required(),
    password: joi
      .string()
      .messages({ 
        'string.base': msg,
        'string.empty': msg,
      })
      .required(),
  });

module.exports = valid;
