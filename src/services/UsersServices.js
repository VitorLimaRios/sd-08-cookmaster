const jwt = require('jsonwebtoken');
const UsersModels = require('../models/UsersModels');

const SECRET = 'meuacesso123';

const jwtSett = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const isValidUser = (name, email, password) => {
  if(!name) { 
    throw new Error('Invalid entries. Try again.'); 
  };
  const regex = /.+@[A-z]+[.]com/; 
  if(!email) {
    throw new Error('Invalid entries. Try again.');
  }
  if(!regex.test(email)){
    throw new Error('Invalid entries. Try again.');
  }
  if(!password) {
    throw new Error('Invalid entries. Try again.');
  }
  return undefined;
};

const addUser = async (name, email, password) => {

  const isNotValid = isValidUser(name, email, password);

  const findEmail = await UsersModels
    .findEmail(email);

  if (isNotValid) {
    throw new Error(isNotValid);
  }

  if (findEmail) {
    throw new Error('Email already registered');
  }
  let result = await UsersModels
    .addUser(name, email, password);
  return result;
};


const isValidLogin = (email, password) => {

  if (!email || !password) {
    throw new Error('All fields must be filled');
  }
  return undefined;
};

const getLogin = async (email, password) => {
  
  const isNotValid = isValidLogin(email, password);

  const findUserByEmail = await UsersModels.findEmail(email);

  if (isNotValid) {
    throw new Error(isNotValid);
  }

  if (!findUserByEmail || findUserByEmail.password !== password) {
    throw new Error('Incorrect username or password');
  }

  const token = jwt.sign({ email, password}, SECRET, jwtSett);
  return token;
};

module.exports = {
  addUser,
  getLogin,
};