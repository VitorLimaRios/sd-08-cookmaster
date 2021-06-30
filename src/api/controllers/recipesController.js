const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const recipeData = req.body;
  const token = req.headers.authorization;
  const { code, response } = await recipesService.createRecipe(recipeData, token);

  return res.status(code).json(response);
};

const getAllRecipes = async (_req, res) => {
  const { code, response } = await recipesService.getAllRecipes();
  return res.status(code).json(response);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { code, response } = await recipesService.getRecipeById(id);
  return res.status(code).json(response);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { code, response } = await recipesService.updateRecipe(data, id);
  return res.status(code).json(response); 
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
