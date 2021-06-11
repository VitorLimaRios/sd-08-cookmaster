const UserModel = require('../models/userModel');
const LoginValidations = require('./loginValidations');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async (login) => {
  const { email: emailIn, password: passwordIn } = login;
  
  LoginValidations.validateEmailIsRequire(emailIn);
  LoginValidations.validatePasswordIsRequire(passwordIn);
  await LoginValidations.validateLoginPassword(emailIn, passwordIn);
  
  const user = await UserModel.findByEmail(emailIn);

  const { _id, email, role } = user;
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);

  return token;
};

module.exports = {
  login,
};
