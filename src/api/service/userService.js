const user = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};



const isValidThings = (name, email, password, _role) => {
  if(!name) { 
    return 'Invalid entries. Try again.'; 
  };

  //regex tirada do: https://formik.org/docs/guides/validation
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if(!email) {
    return 'Invalid entries. Try again.';
  }

  if(!regexEmail.test(email)){
    return 'Invalid entries. Try again.';
  }

  if(!password) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const isValidLogin = async (email, password) => {
  const userEmail = await user.findEmail(email);
  const userPassword = await user.findPassword(password);

  if(!email || !password) {
    return 'All fields must be filled';
  }

  if(!userEmail || !userPassword) {
    return 'Incorrect username or password';
  }

  return undefined;
};

const create = async (name, email, password) => {
  const findUser = await user.findEmail(email);
  if (findUser) {
    throw new Error('Email already registered');
  }
  const notValid = isValidThings(name, email, password);
  if (notValid) {
    throw new Error(notValid);
  }
  return await user.create(name, email, password);
};

const login = async (email, password) => {
  const notValid = await isValidLogin(email, password);
  if(notValid){
    throw new Error(notValid);
  }
  const token = jwt.sign({ email, password}, secret, jwtConfig);
  // console.log(token);
  return token;
};

module.exports = {
  create,
  login,
};
