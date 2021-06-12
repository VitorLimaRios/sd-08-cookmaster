const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const validateRecipe = require('../middlewares/validateRecipes');

const recipesController = Router();
const recipes = require('../services/recipe');

recipesController.post('/', validateToken, validateRecipe, recipes.post);

module.exports = recipesController;
