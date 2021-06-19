const RecipeService = require('../../services/recipe');
const createError = require('../../utils/createError');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const result = await RecipeService.getById(id);
  if (!result) return next(createError('recipe not found', 'not_found'));
  res.json(result);
};
