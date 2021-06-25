const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const recipesServices = require('../services/recipesService');

const { validateRecipe } = require('../schemas/recipesSchema');
const { validateJWT } = require('../auth/validateJWT');
const StatusCode = require('../schemas/StatusCode.js');

router.get('/', rescue(async(_req, res) => {
  const recipes = await recipesServices.getAllRecipes();

  if (!recipes) return res.status(StatusCode.NOT_FOUND).json({ message: "recipes not found" });

  res.status(StatusCode.OK).json(recipes);
}));

router.get('/:id', rescue(async(req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getRecipeById(id);

  if (!recipe) return res.status(StatusCode.NOT_FOUND).json({ message: "recipe not found" });

  res.status(StatusCode.OK).json(recipe);
}));

router.post('/', validateRecipe, validateJWT, rescue(async(req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req._id;
  const createdNewRecipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);

  res.status(StatusCode.CREATED).json(createdNewRecipe);
}));

router.put('/:id', validateJWT, rescue(async(req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const user = req.user;
  const userId = user._id;

  const updatedRecipe = await recipesServices.updateRecipeById(id, name, ingredients, preparation, userId);

  res.status(StatusCode.OK).json(updatedRecipe);
}));

router.delete('/:id', validateJWT, rescue(async(req, res) => {
  const { id } = req.params;
  const user = req.user;

  await recipesServices.deleteRecipeById(id, user);

  res.status(StatusCode.NO_CONTENT).json({ message: "success "});
}));

module.exports = router;
