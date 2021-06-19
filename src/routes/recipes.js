const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipe');
const middlewares = require('../middlewares');

const { STATUS } = require('../constants');

router.get('/:id', RecipeController.getRecipeById);
router.get('/', RecipeController.getAllRecipes);

router.post('/', middlewares.auth, RecipeController.createRecipe);

router.put('/:id/image', [
  middlewares.auth,
  RecipeController.uploadImage,
  middlewares.upload.single('image'),
  (req, res) => res.status(STATUS.OK).json(req.recipe)
]);

router.put('/:id', middlewares.auth, RecipeController.editRecipe);

router.delete('/:id', middlewares.auth, RecipeController.deleteRecipe);

module.exports = router;
