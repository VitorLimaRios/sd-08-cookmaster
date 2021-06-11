const express = require('express');
const recipesController = require('../controllers/recipes');

const middlewares = require('../middlewares');

const recipes = express.Router();

recipes.get('/', recipesController.readRecipes);
recipes.post('/', middlewares.verifyToken ,  recipesController.createRecipe);

module.exports = recipes;