const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipe');
const middlewares = require('../middlewares');

router.get('/:id', RecipeController.getRecipeById);
router.get('/', RecipeController.getAllRecipes);

router.post('/', middlewares.auth, RecipeController.createRecipe);

router.put('/:id', middlewares.auth, RecipeController.editRecipe);

module.exports = router;
