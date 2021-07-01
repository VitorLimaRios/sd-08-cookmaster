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
  const token = req.headers.authorization;
  const data = req.body;
  const { code, response } = await recipesService.updateRecipe(data, id, token);
  return res.status(code).json(response); 
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { code, response } = await recipesService.deleteRecipe(id, token);
  return res.status(code).json(response);
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { filename, destination } = req.file;
  const { host } = req.headers;
  const path = `${host}/${destination}${filename}`;
  const { code, response } = await recipesService.uploadImage(id, path);
  return res.status(code).json(response);
};

module.exports = {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  uploadImage,
};
