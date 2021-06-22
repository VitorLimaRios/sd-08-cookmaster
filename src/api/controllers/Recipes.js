const Recipes = require('../services/Recipes');

const getAll = async (_req, res) => {
  const recipeList = await Recipes.getAll();
  res.status(200).json(recipeList);
};

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;

  const addNewRecipe = await Recipes.newRecipe(name, ingredients, preparation, userId);
  res.status(201).json(addNewRecipe);
};

module.exports = {
  getAll,
  newRecipe,
};
