const Joi = require('joi');

const insert = Joi.object({
  fill_it_up: Joi.string().required(),
  label2: Joi.string().isoDate().message('Date needs to be on ISODate pattern')
    .required(),
  label3: Joi.number().required(),
  label4: Joi.array().items(Joi.number()).required(),
})
  .messages({
    'any.required': 'The {#label} field is required.',
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
