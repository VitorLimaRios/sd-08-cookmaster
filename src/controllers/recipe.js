const { Router } = require('express');
const validateToken = require('../auth/validateToken');
const validateRecipe = require('../middlewares/validateRecipes');
const imageUpload = require('../middlewares/imageUpload');

const recipesController = Router();
const recipes = require('../services/recipe');

recipesController.post('/', validateToken, validateRecipe, recipes.post);
recipesController.get('/', recipes.getAll);
recipesController.put('/:id/image', validateToken, imageUpload(), recipes.upload);
recipesController.get('/:id', recipes.getOne);
recipesController.put('/:id', validateToken, validateRecipe, recipes.update);
recipesController.delete('/:id', validateToken, recipes.exclude);

module.exports = recipesController;
