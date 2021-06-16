const { CREATED, OK } = require('../api/constants/statusCodes');
const { getAllRecipes } = require('../models/recipeModel');
const { newRecipe, recipeById } = require('../services/recipeServices');

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


module.exports = {
  createsRecipe,
  getsRecipes,
  getsRecipeById,
};
