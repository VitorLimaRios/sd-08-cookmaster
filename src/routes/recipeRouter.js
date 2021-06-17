const express = require('express');
const {
  createsRecipe, getsRecipes, getsRecipeById, updatesRecipe
} = require('../controllers/recipeController');
const tokenValidatorMiddl = require('../middlewares/tokenValidator');
const router = express.Router();

router.post('/', tokenValidatorMiddl, createsRecipe );
router.get('/', getsRecipes);
router.get('/:id', getsRecipeById);
router.put('/:id', tokenValidatorMiddl, updatesRecipe);

module.exports = router;
