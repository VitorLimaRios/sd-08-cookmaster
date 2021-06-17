const express = require('express');
const bodyParser = require('body-parser');
const {
  UNPROCESSABE_ENTITY,
  CREATED,
  OK,
  ID_LENGTH,
  BAD_REQUEST,
  UNAUTHORIZED,
  MIN_PASS_LENGTH,
} = require('./consts');
const { validateEmail } = require('./jokerFunctions');
const { getUser } = require('../models/loginModel');
const { generateToken } = require('./jwt');

const app = express();
app.use(bodyParser.json());

const validatePassword = (password) => (password.length >= MIN_PASS_LENGTH);

const loginValidation = (body) => {
  const { email, password } = body;
  if (!email || !password ) {
    throw {
      status: UNAUTHORIZED,
      message: 'All fields must be filled',
    };
  }
  else if (!validateEmail(email) || !validatePassword(password)) {
    throw {
      status: UNAUTHORIZED,
      message: 'Incorrect username or password',
    };
  }
};

// 2 - Crie um endpoint para o login de usuários
const tryLogin = async(body, res) => {
  try {
    loginValidation(body);
    const user = await getUser(body.email);
    const token = generateToken(user);
    return res.status(OK).json({token});
  } catch (error) {
    return res.status(error.status).json({'message': error.message});
  }
};

module.exports = {
  tryLogin,
};