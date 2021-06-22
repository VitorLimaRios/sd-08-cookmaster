const Recipes = require('../services/Recipes');
const { code } = require('../utils/errorCode');

const getAll = async (_req, res) => {
  const recipeList = await Recipes.getAll();
  res.status(code.OK).json(recipeList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findRecipe = await Recipes.findById(id);
  if (findRecipe.message) return res.status(code.not_found).json(findRecipe);
  res.status(code.OK).json(findRecipe);
};

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user._id;

  const addNewRecipe = await Recipes.newRecipe(name, ingredients, preparation, userId);
  res.status(code.created).json(addNewRecipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const info = req.body;
  const userId = req.user._id;
  
  const updatedRecipe = await Recipes.updateRecipe(id, info, userId);

  res.status(code.OK).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  await Recipes.deleteRecipe(id, userId);
  res.status(code.no_content);
};

module.exports = {
  getAll,
  findById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
};
