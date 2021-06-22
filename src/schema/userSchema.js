const joi = require('@hapi/joi');

const message = {
  create: 'Invalid entries. Try again.',
  login: 'All fields are must be filled.',
};

const schemaCreate = joi
  .object({
    name: joi
      .string()
      .messages({
        'string.base': message.create,
      })
      .required(),
    email: joi
      .string()
      .email()
      .messages({
        'string.base': message.create,
        'string.email': message.create,
      })
      .required(),
    password: joi
      .string()
      .messages({
        'string.base': message.create
      })
      .required()
  }).messages({
    'any.required': message.create
  });

const validateCreateUser = (objForValidate) => {
  const result = schemaCreate.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return  message ;
  }
  return null;
};

// depois se der tempo, refatora essa parte aqui
schemaLogin = joi.object({
  email: joi
    .string()
    .email()
    .messages({
      'string.base': message.create,
      'string.email': message.create,
    })
    .required(),
  password: joi
    .string()
    .messages({
      'string.base': message.create
    })
    .required()
}).messages({
  'any.required': message.create
});


module.exports = { validateCreateUser };
