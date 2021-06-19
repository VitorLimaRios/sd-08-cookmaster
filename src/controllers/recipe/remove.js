const RecipeService = require('../../services/recipe');
const httpStatusCodes = require('../../data/httpStatusCodes');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;
  const result = await RecipeService.remove(id, { userId, role });
  if (result.err) return next(result);
  res.sendStatus(httpStatusCodes.NO_CONTENT);
};
