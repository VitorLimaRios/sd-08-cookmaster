const express = require('express');
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', recipesController.createRecipe);

module.exports = recipesRouter;
