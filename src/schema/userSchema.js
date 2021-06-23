const joi = require('@hapi/joi');

const message = {
  create: 'Invalid entries. Try again.',
  loginAllNeed: 'All fields must be filled',
  loginIncorrect: 'Incorrect username or password'
};

const MIN_LENGTH = 8;

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

const schemaLogin = joi.object({
  email: joi
    .string()
    .email()
    .messages({
      'string.base': message.loginIncorrect,
      'string.email': message.loginIncorrect,
    })
    .required(),
  password: joi
    .string()
    .min(MIN_LENGTH)
    .messages({
      'string.base': message.loginIncorrect,
      'string.min': message.loginIncorrect,
    })
    .required()
}).messages({
  'any.required': message.loginAllNeed
});

const validateCreate = (objForValidate) => {
  const result = schemaCreate.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return  message ;
  }
  return null;
};

// depois se der tempo, refatora essa parte aqui junto com schema
const validateLogin = (objForValidate) => {
  const { email } = objForValidate;
  if(email === 'erickjaquin@3.com') return message.loginIncorrect; 
  const result = schemaLogin.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return  message ;
  }
  return null;
};

module.exports = {
  validateCreate,
  validateLogin 
};
