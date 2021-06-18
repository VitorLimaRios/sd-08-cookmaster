const { CREATED, OK, NO_CONTENT } = require('../api/constants/statusCodes');
const { getAllRecipes } = require('../models/recipeModel');
const { newRecipe, recipeById, updateRecipe, deleteRecipe } = require('../services/recipeServices');

const createsRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const createdRecipe = await newRecipe(name, ingredients, preparation, userId);

  if (createdRecipe.errorMessage) {
    const {errorMessage, errorCode} = createdRecipe;
    return res.status(errorCode).json({message: errorMessage});
  }
  return res.status(CREATED).json({recipe: {...createdRecipe}});

};

const getsRecipes = async (_req, res) => {
  const allRecipes = await getAllRecipes();
  res.status(OK).json(allRecipes);

};

const getsRecipeById = async(req, res) => {
  const recipeId = req.params.id;
  const recipe = await recipeById(recipeId);
  if (recipe.errorMessage) {
    const {errorMessage, errorCode} = recipe;
    return res.status(errorCode).json({message: errorMessage});
  }
  return res.status(OK).json(recipe);
};

const updatesRecipe = async(req, res) => {
  const recipeInfos = req.body;
  // const { token, userId } = req;
  const recipeId = req.params.id;
  const updatedRecipe = await updateRecipe(recipeInfos, recipeId);
  return res.status(OK).json(updatedRecipe);

};

const deletesRecipe = async(req, res) => {
  const recipeId = req.params.id;
  await deleteRecipe(recipeId);
  return res.status(NO_CONTENT).send();
};

module.exports = {
  createsRecipe,
  getsRecipes,
  getsRecipeById,
  updatesRecipe,
  deletesRecipe,
};
