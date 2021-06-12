const express = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById } = require('../controllers/recipesController');

const router = express.Router();

router.post('/recipes', createRecipe);
router.get('/recipes/:id', getRecipeById);
router.get('/recipes', getAllRecipes);

module.exports = router;