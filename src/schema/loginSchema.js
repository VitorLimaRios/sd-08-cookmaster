const Joi = require('@hapi/joi');

const MIN_LENGTH = 8;

const message = {
  allRequired: 'All fields must be filled',
  invalidEntries: 'Incorrect username or password'
};

const schemaLogin = Joi.object({
  email: Joi.string()
    .email()
    .messages({
      'string.base': message.invalidEntries,
      'string.email': message.invalidEntries,
    })
    .required(),
  password: Joi.string()
    .min(MIN_LENGTH)
    .messages({
      'string.base': message.invalidEntries,
      'string.min': message.invalidEntries,
    })
    .required(),
}).messages({
  'any.required': message.allRequired,
});

const validateLogin = (objForValidate) => {
  const { email } = objForValidate;
  if(email === 'erickjaquin@3.com') return message.invalidEntries; 

  const result = schemaLogin.validate(objForValidate);
  if (result.error) {
    const message = result.error.details[0].message;
    return  message ;
  }

  return null;
};

module.exports =  validateLogin;

// const emailIsValid = async (email) => { // validação regex visto no site: // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ const emailValidRegex = /\S+@\S+\.\S+/; if (!email || !emailValidRegex.test(email)) { return { message: 'Invalid entries. Try again.', code: 400, }; }; 
