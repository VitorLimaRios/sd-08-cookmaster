const Joi = require('joi');

const MIN_LENGTH = 5;

const message = {
  allRequired: 'All fields must be filled',
  invalidEntries: 'Incorrect username or password'
};

module.exports = Joi.object({
  email: Joi.string()
    .email()
    .messages({
      'string.base': message.invalidEntries,
      'string.email': message.invalidEntries,
    })
    .required(),
  password: Joi.string()
    .min(MIN_LENGTH)
    .messages({
      'string.base': message.invalidEntries,
      'string.min': message.invalidEntries,
    })
    .required(),
}).messages({
  'any.required': message.allRequired,
});
