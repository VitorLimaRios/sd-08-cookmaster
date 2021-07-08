const express = require('express');
const router = express.Router();

const recipesService = require('../services/recipesService');

const invalidEntriesStatus = 400;
const invalidTokenStatus = 401;
const sucessStatus = 201;

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
