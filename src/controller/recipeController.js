const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const response = await recipeService.createRecipe({ ...req.body, _id: req.user._id });
  res.status(response.code).json(response.message);
};

const getAllRecipes = async (req, res) => {
  const response = await recipeService.getAllRecipes();
  res.status(response.code).json(response.message);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.getRecipeById(id);
  res.status(response.code).json(response.message);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
