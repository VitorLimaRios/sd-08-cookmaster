const express = require('express');
const router = express.Router();

const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipeModel');
const usersModel = require('../models/usersModel');

const invalidEntriesStatus = 400;
const invalidTokenStatus = 401;
const failRecipeStatus = 404;
const sucessStatus = 201;
const sucessAllRecipesStatus = 200;

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const body = req.body;

  const authorizatedToken = await recipesService.authToken(token);

  if (!token) {
    return res.status(invalidTokenStatus).send({ message: 'missing auth token' });
  }

  if (authorizatedToken === 'err') {
    return res.status(invalidTokenStatus).send({ message: 'jwt malformed' });
  }

  const updateRecipe = await recipesModel.updateRecipe(id, body);
  const updatedRecipe = await recipesModel.getById(id);
  
  res.status(sucessAllRecipesStatus).send(updatedRecipe);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const recipeById = await recipesModel.getById(id);

  if (token) {
    const authorizatedToken = await recipesService.authToken(token);
    if (!token || authorizatedToken === 'err') {
      return res.status(invalidTokenStatus).send({ message: 'jwt malformed' });
    }
  }

  if (recipeById) {
    return res.status(sucessAllRecipesStatus).json(recipeById);
  };

  return res.status(failRecipeStatus).json({ 
    message: 'recipe not found'
  });
});

router.get('/', async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    const authorizatedToken = await recipesService.authToken(token);
    if (!token || authorizatedToken === 'err') {
      return res.status(invalidTokenStatus).send({ message: 'jwt malformed' });
    }
  }

  const allRecipes = await recipesModel.getAll();
  res.status(sucessAllRecipesStatus).send(allRecipes);
});

router.post('/', async (req, res) => {
  const token = req.headers.authorization;
  const body = req.body;

  const authorizatedToken = await recipesService.authToken(token);

  if (!token || authorizatedToken === 'err') {
    return res.status(invalidTokenStatus).send({ message: 'jwt malformed' });
  }

  const recipeValidated = await recipesService.recipeValidation(body);
  if (recipeValidated.isJoi) {
    return res.status(invalidEntriesStatus)
      .send({ message: 'Invalid entries. Try again.' });
  }

  const userInformations = await usersModel.getByName(authorizatedToken.data.name);
  const createdRecipe = await recipesService.createRecipe(body, userInformations);
  res.status(sucessStatus).send(createdRecipe);
});

module.exports = router;
