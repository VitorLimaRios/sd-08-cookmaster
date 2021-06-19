const RecipeService = require('../../services/recipe');
const { STATUS } = require('../../constants');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const { id: userId, role } = req.user;

  const result = await RecipeService.deleteRecipe(id, { userId, role });

  if (result.err) return next(result);

  res.sendStatus(STATUS.NO_CONTENT);
};
