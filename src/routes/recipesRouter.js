const express = require('express');

const { recipesController } = require('../controllers');
const {
  registerRecipes,
  getAllRecipes,
  getRecipesById,
} = recipesController;

const recipes = express.Router();

recipes.post('/recipes', registerRecipes);

recipes.get('/recipes', getAllRecipes);

recipes.get('/recipes/:id', getRecipesById);

module.exports = recipes;