const recipeService = require('../services/recipeService');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const createRecipe = async (req, res, next) => {
  const newRecipe = await recipeService.createRecipe({...req.body, userId: req.userId});

  if (newRecipe.bad_request) {
    return next({ status: BAD_REQUEST, message: 'Invalid entries. Try again.' });
  }

  res.status(CREATED).json(newRecipe);
};

const getRecipes = async (_req, res, _next) => {
  const recipes = await recipeService.getRecipes();

  res.status(OK).json(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);

  if (!recipe) {
    return next({ status: NOT_FOUND, message: 'recipe not found' });
  }

  res.status(OK).json(recipe);
};

const editRecipe = async (req, res, next) => {
  const { id } = req.params;
  const recipeData = req.body;
  const editedRecipe = await recipeService.editRecipe(id, recipeData, req.userId);

  if (!editedRecipe) {
    return next({ status: UNAUTHORIZED, message: 'You cant edit this recipe' });
  }

  res.status(OK).json(editedRecipe);
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  const deletedRecipe = await recipeService.deleteRecipe(id);

  if (!deletedRecipe) {
    return next({ status: NOT_FOUND, message: 'recipe not found' });
  }

  res.status(NO_CONTENT).json();
};

const addRecipeImage = async (req, res, next) => {
  const { id } = req.params;

  const editedRecipe = await recipeService.addRecipeImage(id);

  res.status(OK).json(editedRecipe);
};

module.exports = {
  createRecipe, getRecipes, getRecipeById, editRecipe, deleteRecipe, addRecipeImage
};
