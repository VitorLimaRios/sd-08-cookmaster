const userModel = require('../model/userModel');

const NUMBER_ZERO = 0;
const nameIsValid = (name) => {
  if (!name || name.length === NUMBER_ZERO) {
    return { 
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  };
};

const emailIsValid = async (email) => {
  // validação regex visto no site: 
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  const emailValidRegex = /\S+@\S+\.\S+/;
  if (!email || !emailValidRegex.test(email)) {
    return { 
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  };

  const getUser = await userModel.getOneUser(email);

  if(getUser) {
    return {
      message: 'Email already registered',
      code: 409,
    };
  };
};

const passwordIsValid = (password) => {
  
  if (!password) {
    return { 
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  };
};

const userValidations = async (name, email, password) => {
  const nameValidations = nameIsValid(name);
  const emailValidations = await emailIsValid(email);
  const passwordValidations = passwordIsValid(password);

  if (nameValidations) return { erro: nameValidations };
  if (passwordValidations) return { erro: passwordValidations };
  if (emailValidations) return { erro: emailValidations };
};

module.exports = {
  userValidations,
};
