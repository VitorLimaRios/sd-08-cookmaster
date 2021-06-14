const joi = require('joi');

const requiredString = joi.string().required();

module.exports = joi.object({
  name: requiredString,
  ingredients: requiredString,
  preparation: requiredString,
  userId: requiredString
})
  .messages({
    'any.required': 'Invalid entries. Try again.'
  });
