const express = require('express');
const {
  createsRecipe, getsRecipes, getsRecipeById, updatesRecipe, deletesRecipe
} = require('../controllers/recipeController');
const tokenValidatorMiddl = require('../middlewares/tokenValidator');
const router = express.Router();

router.post('/', tokenValidatorMiddl, createsRecipe );
router.get('/', getsRecipes);
router.get('/:id', getsRecipeById);
router.put('/:id', tokenValidatorMiddl, updatesRecipe);
router.delete('/:id', tokenValidatorMiddl, deletesRecipe);

module.exports = router;
