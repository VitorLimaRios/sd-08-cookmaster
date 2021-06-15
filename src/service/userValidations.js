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

const emailLoginIsValid = async (email, pass) => {
  // validação regex visto no site: 
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  if (!pass) {
    return { 
      message: 'All fields must be filled',
      code: 401,
    };
  };

  if (!email) {
    return { 
      message: 'All fields must be filled',
      code: 401,
    };
  };

  const getUser = await userModel.getOneUser(email);

  if (!getUser) {
    return {
      message: 'Incorrect username or password',
      code: 401,
    };
  };
};

const passwordLoginIsValid = (pass, user) => {
  const { password } = user;
  if (pass && pass !== password) {
    return {
      message: 'Incorrect username or password',
      code: 401,
    };
  };
};


const loginIsValidate = async (user) => {
  const { email, password } = user;

  const emailIsValid = await emailLoginIsValid(email, password);
  if (emailIsValid) return { erro: emailIsValid };

  const getUser = await userModel.getOneUser(email);

  const passIsValid = passwordLoginIsValid(password, getUser);
  if (passIsValid) return { erro: passIsValid };
};

module.exports = {
  userValidations,
  loginIsValidate,
};
