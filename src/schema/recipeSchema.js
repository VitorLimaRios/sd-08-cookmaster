const joi = require('@hapi/joi');

const message = {
  create: 'Invalid entries. Try again.',
  // loginAllNeed: 'All fields must be filled',
  // loginIncorrect: 'Incorrect username or password'
};

const schemaCreate = joi
  .object({
    name: joi
      .string()
      .messages({
        'string.base': message.create,
      })
      .required(),
    ingredients: joi
      .string()
      .messages({
        'string.base': message.create,
      })
      .required(),
    preparation: joi
      .string()
      .messages({
        'string.base': message.create
      })
      .required()
  }).messages({
    'any.required': message.create
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