const express = require('express');
const user = require('../controller/userController');
const Router = express.Router();
const recipes = require('../controller/recipeController');
const auth = require('../auth');

Router.post('/users', user.createUser);
Router.post('/login', user.login);

Router.post('/recipes', auth, recipes.create);
Router.get('/recipes', recipes.getAll);
Router.get('/recipes/:id', recipes.getById);
module.exports = Router;