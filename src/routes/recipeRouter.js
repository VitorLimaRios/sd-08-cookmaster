const express = require('express');
const {
  createsRecipe, getsRecipes, getsRecipeById,
  updatesRecipe, deletesRecipe, addRecipeImageUrl
} = require('../controllers/recipeController');
const photoFileFilter = require('../middlewares/photoFileFilter');
const tokenValidatorMiddl = require('../middlewares/tokenValidator');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/', tokenValidatorMiddl, createsRecipe );
router.get('/', getsRecipes);
router.get('/:id', getsRecipeById);
router.put(
  '/:id/image', 
  tokenValidatorMiddl, 
  upload.single('image'), 
  photoFileFilter, 
  addRecipeImageUrl
);
router.put('/:id', tokenValidatorMiddl, updatesRecipe);
router.delete('/:id', tokenValidatorMiddl, deletesRecipe);

module.exports = router;
