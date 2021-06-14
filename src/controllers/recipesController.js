const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  const result = await recipesService.createRecipes({...req.body, _id: req.user._id });
  res.status(result.code).json(result.message);
};

const getRecipes = async (_req, res) => {
  const result = await recipesService.getRecipes();
  res.status(result.code).json(result.message);
};

module.exports = {
  createRecipes,
  getRecipes,
};