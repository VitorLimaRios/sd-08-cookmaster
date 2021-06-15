const user = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'segredin';
const jwtConfig = {
  expiresIn: '14d',
  algorithm: 'HS256',
};

const isValidThings = (name, email, password) => {
  //regex igual ao do meu projeto trybe wallet

  const regexEmail = /\S+@\S+\.\S+/;

  if(!name || !email || !regexEmail.test(email) || !password ) { 
    return 'Invalid entries. Try again.'; 
  };

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
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return token;
};

module.exports = {
  create,
  login,
};