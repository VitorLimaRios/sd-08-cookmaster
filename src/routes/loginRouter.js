const express = require('express');

const { loginController } = require('../controllers');
const {
  usersLogin,
} = loginController;

const login = express.Router();

login.post('/login', usersLogin);

module.exports = login;