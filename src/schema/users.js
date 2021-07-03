const joi = require('joi');

const PASS_LENGTH = 6;

const create = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(PASS_LENGTH).required()
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(PASS_LENGTH).required(),
});

module.exports = {
  create,
  login
};
