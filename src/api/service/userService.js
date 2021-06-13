const model = require('../models/userModel');

const jwt = require('jsonwebtoken');

const secret = 'socorro123';
const jwtConfig = {
  expiresIn: '9d',
  algorithm: 'HS256',
};

const validateUser = (name, email, password, role) => {
  if(!name) { 
    return 'Invalid entries. Try again.'; 
  };
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if(!email) {
    return 'Invalid entries. Try again.';
  }
  if(!regex.test(email)){
    return 'Invalid entries. Try again.';
  }
  if(!password) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const validateLogin = (email, password) => {
  if (!email || !password) {
    return 'All fields must be filled';
  }
  return undefined;
};

const createUser = async (name, email, password) => {
  const invalid = validateUser(name, email, password);
  if (invalid) {
    throw new Error(invalid);
  }
  const findUser = await model.findUser(email);
  // console.log('findUser service:', findUser);
  if (findUser) {
    throw new Error('Email already registered');
  }
  return await model.createUser(name, email, password);
};

const login = async (email, password) => {
  const invalid = validateLogin(email, password);
  if (invalid) {
    throw new Error(invalid);
  }
  const findUser = await model.findUser(email);
  if (!findUser || findUser.password !== password) {
    throw new Error('Incorrect username or password');
  }
  const token = jwt.sign({ email, password}, secret, jwtConfig);
  return token;
};

module.exports = {
  createUser,
  login,
};
