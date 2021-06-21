const recipes = require('../services/recipes');

const BAD_REQUEST = 400;
const CREATE = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const OK = 200;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await recipes.createRecipe(name, ingredients, preparation);
  if (newRecipe.err) return res.status(BAD_REQUEST).json({ message: newRecipe.err });

  return res.status(CREATE).json(newRecipe.data);
};

const getRecipes = async (req, res) => {
  const result = await recipes.getRecipes();

  return res.status(OK).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipeById = await recipes.getRecipeById(id);
  if (recipeById.err) return res.status(NOT_FOUND).json({ message: recipeById.err });

  return res.status(OK).json(recipeById.data);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const updatedRecipe = await recipes.updateRecipe(id, name, ingredients, preparation);

  return res.status(OK).json(updatedRecipe.data);
};

module.exports = {
  createRecipe,  
  getRecipes,
  getRecipeById,
  updateRecipe
};