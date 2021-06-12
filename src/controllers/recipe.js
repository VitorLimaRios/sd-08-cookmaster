const { Router } = require('express');
const validateToken = require('../auth/validateToken');

const recipesController = Router();
const recipes = require('../services/recipe');

recipesController.post('/', validateToken, recipes.post);

module.exports = recipesController;
