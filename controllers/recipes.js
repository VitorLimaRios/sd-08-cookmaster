const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user._id;
  const result = await recipesService.createRecipe(name, ingredients, preparation, _id);
  res.status(result.code).json(result.message);
};

const getAll = async (req, res) => {
  const recipes = await recipesService.getAll();
  res.status(recipes.code).json(recipes.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  res.status(recipe.code).json(recipe.message);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
