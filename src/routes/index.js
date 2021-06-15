const Routes = require('express').Router();
const rescue = require('express-rescue');

const ControllerUsers = require('../controllers/controllerUser');
const controllerUsers = new ControllerUsers();

const ControllerLogin = require('../controllers/controllerLogin');
const controllerLogin = new ControllerLogin();

Routes.post('/users', controllerUsers.create);
Routes.post('/login', controllerLogin.login);

module.exports = Routes;
