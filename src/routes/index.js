const Routes = require('express').Router();
const rescue = require('express-rescue');

const middlewares = require('../middlewares');

const ControllerUsers = require('../controllers/controllerUser');
const controllerUsers = new ControllerUsers();

const ControllerLogin = require('../controllers/controllerLogin');
const controllerLogin = new ControllerLogin();

const ControllerRecipe = require('../controllers/controllerRecipe');
const controllerRecipe= new ControllerRecipe();

Routes.post('/users', controllerUsers.create);
Routes.post('/login', controllerLogin.login);
Routes.post('/recipes', [middlewares.authentication, controllerRecipe.create]);
Routes.get('/recipes', controllerRecipe.getAll);
Routes.get('/recipes/:id', [middlewares.verifyObjectId, controllerRecipe.getOne]);


module.exports = Routes;
