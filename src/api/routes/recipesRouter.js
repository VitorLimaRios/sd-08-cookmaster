const express = require('express');
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', recipesController.createRecipe);
recipesRouter.get('/', recipesController.getAllRecipes);

module.exports = recipesRouter;
