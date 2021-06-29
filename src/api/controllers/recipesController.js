const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const recipeData = req.body;
  const token = req.headers.authorization;
  const { code, response } = await recipesService.createRecipe(recipeData);

  return res.status(code).json(response);
};

module.exports = {
  createRecipe,
};