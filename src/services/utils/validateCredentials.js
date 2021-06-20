const Joi = require('joi');

const MINLENGTHPASSWORD = 3;

const validateCredentials = (userData) =>
  /* Utilizamos o Joi para validar o schema do body */
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(MINLENGTHPASSWORD).required(),
  }).validate(userData);

module.exports = {
  validateCredentials,
};
