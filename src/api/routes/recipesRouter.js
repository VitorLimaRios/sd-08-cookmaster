const express = require('express');
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', recipesController.createRecipe);
recipesRouter.get('/', recipesController.getAllRecipes);
recipesRouter.get('/:id', recipesController.getRecipeById);

module.exports = recipesRouter;
