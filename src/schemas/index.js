const Joi = require("joi");
const msg = "Invalid entries. Try again.";

const userSchemas = Joi.object({
  name: Joi.string()
    .messages({
      "string.base": msg,
      "string.empty": msg,
      "any.required": msg,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "string.base": msg,
      "string.empty": msg,
      "any.required": msg,
    })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      "string.base": msg,
      "string.empty": msg,
      "any.required": msg,
    })
    .required(),
});

module.exports = { userSchemas };
