const service = require('../services/Recipes');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.createRecipe(newRecipe, token);
  return res.status(status).json(result);
};

const searchRecipes = async (req, res) => {
  const { id } = req.params;
  const { status, result } = await service.searchRecipes(id);
  return res.status(status).json(result);
};

module.exports = { createRecipe, searchRecipes };
