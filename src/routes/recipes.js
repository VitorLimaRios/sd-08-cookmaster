const express = require('express');
const recipesController = require('../controllers/recipes');

const recipes = express.Router();

recipes.get('/', recipesController.readRecipes);
recipes.post('/', recipesController.createRecipe);

module.exports = recipes;