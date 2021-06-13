const express = require('express');
const user = require('../controller/userController');
const recipes = require('../controller/recipeController');
const auth = require('../auth');
const Router = express.Router();

Router.post('/users', user.createUser);
Router.post('/login', user.login);


Router.post('/recipes', auth, recipes.create);
Router.get('/recipes', recipes.getAll);
Router.get('/recipes/:id', recipes.getRecipeById);



module.exports = Router;
