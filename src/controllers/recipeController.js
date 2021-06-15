const recipeService = require('../services/recipeService');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;

const createRecipe = async (req, res, next) => {
  const newRecipe = await recipeService.createRecipe({...req.body, userId: req.userId});

  if (newRecipe.bad_request) {
    return next({ status: BAD_REQUEST, message: 'Invalid entries. Try again.' });
  }

  res.status(CREATED).json(newRecipe);
};

const getRecipes = async (req, res, next) => {
  const recipes = await recipeService.getRecipes();

  res.status(OK).json(recipes);
};

module.exports = { createRecipe, getRecipes };
