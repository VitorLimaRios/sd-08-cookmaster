const service = require('../services/Recipes');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.createRecipe(newRecipe, token);
  return res.status(status).json(result);
};

const searchAllRecipes = async (_req, res) => {
  const { status, result } = await service.searchRecipes();
  return res.status(status).json(result);
};

module.exports = { createRecipe, searchAllRecipes };
