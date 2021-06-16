const express = require('express');

const { recipesController } = require('../controllers');
const {
  registerRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipes,
} = recipesController;

const recipes = express.Router();

recipes.post('/recipes', registerRecipes);

recipes.get('/recipes', getAllRecipes);

recipes.get('/recipes/:id', getRecipesById);

recipes.put('/recipes/:id', updateRecipes);

module.exports = recipes;