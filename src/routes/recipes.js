const express = require('express');
const recipesController = require('../controllers/recipes');

const middlewares = require('../middlewares');

const recipes = express.Router();

recipes.get('/', recipesController.readRecipes);
recipes.get('/:id', recipesController.readRecipeById);
recipes.post('/', middlewares.verifyToken ,  recipesController.createRecipe);
recipes.put('/:id', middlewares.verifyToken, recipesController.updateRecipe );

module.exports = recipes;