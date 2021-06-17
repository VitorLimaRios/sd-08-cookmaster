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
  label1: Joi.string(),
  label2: Joi.string().isoDate().message('Date needs to be on ISODate pattern'),
  label3: Joi.number(),
  label4: Joi.array().items(Joi.number()),
});

module.exports = {
  insert,
  update,
};
