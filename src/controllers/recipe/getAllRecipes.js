const RecipeService = require('../../services/recipe');

module.exports = async (_req, res) => {
  const result = await RecipeService.getAllRecipes();

  res.json(result);
};
