const Recipes = require('../services/Recipes');

const getAll = async (_req, res) => {
  const recipeList = await Recipes.getAll();
  res.status(200).json(recipeList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findRecipe = await Recipes.findById(id);
  if (findRecipe.err) return res.status(404).json(findRecipe.err);
  res.status(200).json(findRecipe);
};

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;

  const addNewRecipe = await Recipes.newRecipe(name, ingredients, preparation, userId);
  res.status(201).json(addNewRecipe);
};

module.exports = {
  getAll,
  findById,
  newRecipe,
};
