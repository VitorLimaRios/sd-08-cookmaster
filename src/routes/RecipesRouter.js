const express = require('express');
const router = express.Router();

const {
  validateEntries,
  validateMalformedToken,
} = require('../middlewares/recipesMiddleware');

const RecipesController = require('../controllers/RecipesController');

router.post('/',
  validateEntries,
  validateMalformedToken,
  RecipesController.createRecipes,
);

module.exports = router;
