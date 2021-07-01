const express = require('express');
const recipesController = require('../controllers/recipesController');
const upload = require('../middlewares/upload');

const recipesRouter = express.Router();

recipesRouter.post('/', recipesController.createRecipe);
recipesRouter.get('/', recipesController.getAllRecipes);
recipesRouter.get('/:id', recipesController.getRecipeById);
recipesRouter.put('/:id', recipesController.updateRecipe);
recipesRouter.delete('/:id', recipesController.deleteRecipe);
recipesRouter.put('/:id/image', upload.single('image'), recipesController.uploadImage);

module.exports = recipesRouter;
