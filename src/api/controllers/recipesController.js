const express = require('express');
const router = express.Router();

const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipeModel');

const invalidEntriesStatus = 400;
const invalidTokenStatus = 401;
const sucessStatus = 201;
const sucessAllRecipesStatus = 200;

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

  const recipeValidated = await recipesService
    .recipeValidation(body, authorizatedToken.data.name);
  if (recipeValidated.isJoi) {
    return res.status(invalidEntriesStatus)
      .send({ message: 'Invalid entries. Try again.' });
  }

  const createdRecipe = await recipesService.createRecipe(body, recipeValidated);
  res.status(sucessStatus).send(createdRecipe);
});

module.exports = router;
