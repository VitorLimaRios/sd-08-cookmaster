const express = require('express');
const user = require('../controller/userController');
const Router = express.Router();

Router.post('/users', user.createUser);

module.exports = Router;
