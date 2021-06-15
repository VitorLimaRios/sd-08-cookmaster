const express = require('express');

const { recipesController } = require('../controllers');
const {
  registerRecipes,
  getAllRecipes,
} = recipesController;

const recipes = express.Router();

recipes.post('/recipes', registerRecipes);
recipes.get('/recipes', getAllRecipes);

module.exports = recipes;