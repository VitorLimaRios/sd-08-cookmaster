const express = require('express');

const { recipesController } = require('../controllers');
const {
  registerRecipes,
} = recipesController;

const recipes = express.Router();

recipes.post('/recipes', registerRecipes);

module.exports = recipes;