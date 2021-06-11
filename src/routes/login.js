const express = require('express');
const userControllers = require('../controllers/users');

const login = express.Router();

login.post('/', userControllers.login);

module.exports = login;