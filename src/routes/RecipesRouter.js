const express = require('express');
const router = express.Router();

const {
  validateEntries,
  validateMalformedToken,
  verifyId,
} = require('../middlewares/recipesMiddleware');

const RecipesController = require('../controllers/RecipesController');

router.post('/',
  validateEntries,
  validateMalformedToken,
  RecipesController.createRecipes,
);

router.get('/', RecipesController.getAllRecipes);
router.get('/:id', verifyId, RecipesController.getRecipeById);

module.exports = router;
