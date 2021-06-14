const express = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe  } = require('../controllers/recipesController');

const router = express.Router();

router.post('/recipes', createRecipe);
router.get('/recipes/:id', getRecipeById);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.get('/recipes', getAllRecipes);

module.exports = router;