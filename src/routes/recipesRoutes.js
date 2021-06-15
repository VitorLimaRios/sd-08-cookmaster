const express = require('express');
const recipesRoutes = express.Router();
const { 
  createRecipe, 
  checkBody, 
  getAllRecipes,
  checkRecipeID,
  checkToken,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeFile,
  upload,
} = require('../controllers/recipesControllers');

recipesRoutes.post('/', checkBody, createRecipe);

recipesRoutes.get('/:id', checkRecipeID, getOneRecipe);

recipesRoutes.get('/', getAllRecipes);

recipesRoutes.put('/:id/image', checkRecipeID, checkToken, 
  upload.single('image'), updateRecipeFile);

recipesRoutes.put('/:id', checkRecipeID, checkToken, updateRecipe);

recipesRoutes.delete('/:id', checkRecipeID, checkToken, deleteRecipe);

module.exports = recipesRoutes;