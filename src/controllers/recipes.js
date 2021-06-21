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

const getRecipes = async (_req, res) => {
  const list = await recipes.getRecipes();
  return res.status(OK).json(list);
};
  
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipeById = await recipes.getRecipeById(id);
  if (recipeById.err) return res.status(NOT_FOUND).json({ message: recipeById.err });
  return res.status(OK).json(recipeById.data);
};

module.exports = {
  createRecipe,  
  getRecipes,
  getRecipeById,
};