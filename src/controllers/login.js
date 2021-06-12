const { Router } = require('express');
const { validateLogin } = require('../middlewares/validateLogin');

const loginController = Router();
const login = require('../services/login');

loginController.post('/', validateLogin, login.returnToken);

module.exports = loginController;
