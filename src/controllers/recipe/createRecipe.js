const RecipeService = require('../../services/recipe');
const { STATUS } = require('../../constants');

module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { id: userId } = req.user;

  const result = await RecipeService
    .createRecipe({ name, ingredients, preparation, userId });

  if (result.err) return next(result);

  res.status(STATUS.CREATED).json({ recipe: result });
};
