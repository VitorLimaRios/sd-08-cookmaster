const express = require('express');
const recipesRoutes = express.Router();
const { 
  createRecipe, 
  checkBody, 
  getAllRecipes,
  getOneRecipe
} = require('../controllers/recipesControllers');

recipesRoutes.post('/', checkBody, createRecipe);

recipesRoutes.get('/:id', getOneRecipe);

recipesRoutes.get('/', getAllRecipes);


module.exports = recipesRoutes;