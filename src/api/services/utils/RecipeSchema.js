const Joi = require('joi');

const message = 'Invalid entries. Try again.';
const repiceVerify = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required()
}).messages({
  'any.required': message  
});

module.exports = repiceVerify;