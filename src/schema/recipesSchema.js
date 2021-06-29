const joi = require('@hapi/joi');

const message = {
  invalidEntries: 'Invalid entries. Try again.',
};

const schemaCreate = joi
  .object({
    name: joi
      .string()
      .messages({
        'string.base': message.invalidEntries,
      })
      .required(),
    ingredients: joi
      .string()
      .messages({
        'string.base': message.invalidEntries,
      })
      .required(),
    preparation: joi
      .string()
      .messages({
        'string.base': message.invalidEntries
      })
      .required()
  }).messages({
    'any.required': message.invalidEntries
  });

const validateCreate = (objForValidate) => {
  const result = schemaCreate.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return  message ;
  }
  return null;
};

module.exports ={
  validateCreate
};