const express = require('express');
const { resolve } = require('path');

const uploadImages = require('../middlewares/uploadImagesMiddleware');

const { recipesController } = require('../controllers');
const {
  registerRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipes,
  deleteRecipes,
  uploadRecipeImage,
  showImage,
} = recipesController;

const recipes = express.Router();

recipes.post('/recipes', registerRecipes);

recipes.get('/recipes', getAllRecipes);

recipes.get('/recipes/:id', getRecipesById);

recipes.put('/recipes/:id', updateRecipes);

recipes.delete('/recipes/:id', deleteRecipes);

recipes.put('/recipes/:id/image', uploadImages.single('image'), uploadRecipeImage);

// recipes.get('/images/:id.jpeg', showImage);
// recipes.get('/images', express.static(resolve(__dirname, '..', 'uploads')), showImage);

module.exports = recipes;