const Joi = require('joi');

const insert = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
})
  .messages({
    'any.required': 'Invalid entries. Try again.',
    'string.type': '{#label} needs to be a string',
  });

const update = Joi.object({
  name: Joi.string(),
  ingredients: Joi.string(),
  preparation: Joi.string(),
});

module.exports = {
  insert,
  update,
};
