const express = require('express');

const recipesController = require('../controllers/recipesController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, recipesController.registerRecipe);

router.get('/:id', recipesController.getRecipeById);
router.get('/', recipesController.getAllRecipes);

router.put('/:id', auth, recipesController.updateRecipeById);

router.delete('/:id', auth, recipesController.deleteRecipeById);

module.exports = router;
