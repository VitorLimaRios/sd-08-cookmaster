const recipesModel = require('../models/recipes');
const recipesService = require('../services/recipes');
const OK_STATUS = 200;
const NOT_FOUNDED = 404;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const {
    user: { _id },
  } = req;

  const newRecipe = await recipesService.recipeIsValid(
    name,
    ingredients,
    preparation,
    _id
  );

  return res.status(newRecipe.status).json(newRecipe.message);
};

const getRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();
  return res.status(OK_STATUS).json(recipes);
};

const findRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.idIsValid(id);
  if (recipe.status === NOT_FOUNDED) {
    return res.status(recipe.status).json({ message: recipe.message });
  }

  return res.status(recipe.status).json(recipe.message);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipesService.updateRecipeIsValid(id, user);
  const editedRecipe = await recipesModel.updateRecipe(
    id,
    name,
    ingredients,
    preparation
  );

  return res.status(recipe.status).json({...editedRecipe, userId: recipe.userId});
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const deletedRecipe = await recipesService.deleteRecipe(id, user);

  return res.status(deletedRecipe.status).json();
};

module.exports = {
  createRecipe,
  getRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe
};
