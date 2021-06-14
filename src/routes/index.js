const Routes = require('express').Router();
const rescue = require('express-rescue');

const ControllerUsers = require('../controllers/controllerUser');
const controllerUsers = new ControllerUsers();

Routes.post('/users', controllerUsers.create);

module.exports = Routes;
