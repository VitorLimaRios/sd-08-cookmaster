const express = require('express');
const user = require('./controllers/userController');
const Router = express.Router();

Router.post('/users', user.createUser);
Router.post('/login', user.doLogin);

module.exports = Router;