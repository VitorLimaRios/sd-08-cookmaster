const Joi = require('joi');

const message = {
  invalidEntries: 'Invalid entries. Try again.',
};

const schemaCreate = Joi.object({
  name: Joi.string()
    .messages({
      'string.base': message.invalidEntries,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'string.base': message.invalidEntries,
      'string.email': message.invalidEntries,
    })
    .required(),
  password: Joi.string()
    .messages({
      'string.base': message.invalidEntries,
    })
    .required(),
}).messages({
  'any.required': message.invalidEntries,
});

const validateCreate = (objForValidate) => {
  const result = schemaCreate.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return message;
  }
  return null;
};

module.exports = {
  validateCreate,
};
