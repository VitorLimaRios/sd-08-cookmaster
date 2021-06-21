const joi = require('@hapi/joi');

const message = 'Invalid entries. Try again.';

const schemaCreate = joi
  .object({
    name: joi
      .string()
      .messages({
        'string.base': message,
      })
      .required(),
    email: joi
      .string()
      .email()
      .messages({
        'string.base': message,
        'string.email': message,
      })
      .required(),
    password: joi
      .string()
      .messages({
        'string.base': message
      })
      .required()
  }).messages({
    'any.required': message
  });

const validateCreateUser = (objForValidate) => {
  const result = schemaCreate.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return  message ;
  }
  return null;
};

module.exports = { validateCreateUser };
