const RecipeService = require('../../services/recipe');
const { STATUS } = require('../../constants');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  const { name, ingredients, preparation } = req.body;

  const { id: userId, role } = req.user;

  const result = await RecipeService.editRecipe(
    id,
    { name, ingredients, preparation },
    { userId, role }
  );

  if (result.err) return next(result);

  res.status(STATUS.OK).json(result);
};
