const user = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'odeioBackEnd';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const isValid = (name, email, password) => {
  if(!name) {
    return 'Invalid entries. Try again.';
  };
  
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
  const emailLogin = await user.findByEmail(email);

  if(!email || !password) {
    return 'All fields must be filled';
  }

  if(!emailLogin || emailLogin.password !== password){
    return 'Incorrect username or password';
  }

  return undefined;
};

const create = async (name, email, password) => {
  const findUser = await user.findByEmail(email);
  if (findUser) {
    throw new Error('Email already registered');
  }
  const notValid = isValid(name, email, password);
  if (notValid) {
    throw new Error(notValid);
  }
  return await user.create(name, email, password);
};

const login = async (email, password) => {
  const notValidLogin = await isValidLogin(email, password);
  if(notValidLogin) {
    throw new Error(notValidLogin);
  }

  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return token;
};

module.exports = {
  create,
  login,
};