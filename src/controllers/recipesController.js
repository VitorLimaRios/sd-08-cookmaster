const express = require('express');
const authenticator = require('../middlewares/authenticator');
const recipeValidation = require('../middlewares/recipeValidation');
const { addRecipe, getRecipes } = require('../models/recipesModel');
const router = express.Router();

const CREATED = 201;
const OK = 200;

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

module.exports = router;