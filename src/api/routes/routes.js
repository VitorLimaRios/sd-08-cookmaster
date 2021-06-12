const express = require('express');
const user = require('../controller/userController');
const Router = express.Router();

Router.post('/users', user.createUser);
Router.post('/login', user.login);

module.exports = Router;
