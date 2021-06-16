const Joi = require('joi');

const insert = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})
  .messages({
    'any.required': 'All fields must be filled',
    'string.email': 'Invalid entries. Try again.',
  });

module.exports = {
  insert,
};
