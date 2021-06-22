const express = require('express');
const authenticator = require('../middlewares/authenticator');
const recipeValidation = require('../middlewares/recipeValidation');
const { addRecipe, getRecipes, getRecipeById } = require('../models/recipesModel');
const { editRecipe, deleteRecipe } = require('../services/recipesService');
const router = express.Router();

const CREATED = 201;
const OK = 200;
const NOT_FOUND = 404;
const NO_CONTENT = 204;

router.post('/', recipeValidation, authenticator, async (req, res) => {
  const recipe = req.body;
  const userId = req.userId;
  const result = await addRecipe({...recipe, userId});
  res.status(CREATED).json({ recipe: result });
});

router.get('/', async (req, res) => {
  const recipes = await getRecipes();
  res.status(OK).json(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if(!recipe) return res.status(NOT_FOUND).send({ message: 'recipe not found' });
  res.status(OK).json(recipe);
});

router.put('/:id', authenticator, recipeValidation, async (req, res) => {
  const { id } = req.params;
  const { userId: _id, role } = req;
  const editedRecipe = req.body;
  const { status, ...message } = await editRecipe(editedRecipe, id, { _id, role });
  res.status(status).json({...message});
});

router.delete('/:id', authenticator, async (req, res) => {
  const { id } = req.params;
  const { userId: _id, role } = req;
  const { status, ...message } = await deleteRecipe(id, { _id, role });
  res.status(status).json({...message}); 
});

module.exports = router;