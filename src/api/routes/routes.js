const express = require('express');
const user = require('../controller/userController');
const Router = express.Router();

Router.post('/user', user.createUser);

module.exports = Router;
