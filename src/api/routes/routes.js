const express = require('express');
const user = require('../controller/userController');
const recipes = require('../controller/recipeController');
const auth = require('../auth');
const mult = require('../mult');
const Router = express.Router();


Router.post('/users', user.createUser);
Router.post('/login', user.login);


Router.post('/recipes', auth, recipes.create);
Router.get('/recipes', recipes.getAll);
Router.get('/recipes/:id', recipes.getRecipeById);
Router.put('/recipes/:id', auth, recipes.updatedRecipes);
Router.delete('/recipes/:id', auth, recipes.excludeRecipe);
Router.put('/recipes/:id/image', auth, mult().single('image'), recipes.uploadImage);





module.exports = Router;
