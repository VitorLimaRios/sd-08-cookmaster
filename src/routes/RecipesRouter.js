const express = require('express');
const router = express.Router();

const {
  validateEntries,
  validateMalformedToken,
  verifyId,
  validateTokenAuthentication,
  validateMissingToken
} = require('../middlewares/recipesMiddleware');

const RecipesController = require('../controllers/RecipesController');

router.post('/',
  validateEntries,
  validateMalformedToken,
  RecipesController.createRecipes,
);

router.get('/', RecipesController.getAllRecipes);
router.get('/:id', verifyId, RecipesController.getRecipeById);
router.put('/:id',
  validateMissingToken,
  validateMalformedToken,
  validateTokenAuthentication,
  RecipesController.updateRecipeById
);
router.delete('/:id',
  validateMissingToken,
  RecipesController.deleteRecipe
);
router.put('/:id/image',
  validateMissingToken,
  validateTokenAuthentication,
  RecipesController.addImage,
);

module.exports = router;
