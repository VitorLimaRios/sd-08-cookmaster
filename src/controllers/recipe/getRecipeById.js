const RecipeService = require('../../services/recipe');
const { customError } = require('../../utils');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const result = await RecipeService.getRecipeById(id);

  if (!result) return next(customError('recipe not found', 'not_found'));

  res.json(result);
};
