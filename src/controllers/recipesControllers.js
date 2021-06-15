const express = require('express');
const recipesModels = require('../models/recipesModels');
const recipesServices = require('../services/recipesServices');
const validateJWT = require('../auth/validateJWT');
const validateRecipes = require('../middlewares/recipesValidation');
const { status, message } = require('../schema/status');

const routes = express.Router();

routes.post('/', validateJWT, validateRecipes, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const response = await recipesModels.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );
  return res.status(status.created).json({ recipe: response });
});

routes.get('/', async (req, res) => {
  const response = await recipesServices.getAll();
  return res.status(status.OK).json(response);
});

routes.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const recipeById = await recipesModels.getRecipeById(id);
    if (!recipeById) return res.status(status.notFound)
      .json({ message: message.recipeNotFound });
    res.status(status.OK).json(recipeById);
  } catch {
    res.status(status.notFound).json({ message: message.recipeNotFound });
  }
});

routes.put('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const { userId } = req;

  const response = await recipesServices
    .updateRecipeById(id, recipe, userId);
  return res.status(status.OK).json(response);
});

routes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  await recipesServices.deleteRecipeById(id);
  return res.status(status.noContent).json();
});

module.exports = routes;
