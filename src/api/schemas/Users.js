const Joi = require('joi');

const insert = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
  'string.email': 'Invalid entries. Try again.',
});

const insertAdmin = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
}).messages({
  'any.required': 'Invalid entries. Try again.',
  'string.email': 'Invalid entries. Try again.',
});

const update = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});

module.exports = {
  insert,
  update,
  insertAdmin,
};
