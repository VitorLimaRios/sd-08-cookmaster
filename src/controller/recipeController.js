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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.updateRecipe(req.user._id, req.body, id);
  res.status(response.code).json(response.message);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.deleteRecipe(id);
  res.status(response.code).json(response.message);
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.updateImage(id, req.file);
  res.status(response.code).json(response.message);
};

const getImage = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.getImage(id);
  res.status(response.code).json(result);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage,
  getImage
};
