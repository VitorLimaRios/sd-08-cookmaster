const RecipeService = require('../services/recipe');
const httpStatusCodes = require('../data/httpStatusCodes');

const create = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id: userId } = req.user;

  const result = await RecipeService
    .create({ name, ingredients, preparation, userId });

  if (result.err) return next(result);

  res.status(httpStatusCodes.CREATED).json({ recipe: result });
};

module.exports = {
  create
};
