const express = require('express');
const recipesController = require('../controllers/recipesController');
const validate = require('../middlewares/validateRecipesMiddleware');

const router = express.Router();

router.get('/recipes', recipesController.getAllRecipes);

router.get('/recipes/:id', 
  recipesController.getByRecipes
);

router.post('/recipes',
  validate.validateAllRecipes,
  validate.validateJWT,
  recipesController.createRecipes,
);

module.exports = router;
