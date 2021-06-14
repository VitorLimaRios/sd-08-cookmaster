const RecipeService = require('../services/recipe');
const httpStatusCodes = require('../data/httpStatusCodes');
const createError = require('../utils/createError');

const create = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id: userId } = req.user;

  const result = await RecipeService
    .create({ name, ingredients, preparation, userId });

  if (result.err) return next(result);

  res.status(httpStatusCodes.CREATED).json({ recipe: result });
};

const getAll = async (_req, res) => {
  const result = await RecipeService.getAll();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await RecipeService.getById(id);
  if (!result) return next(createError('recipe not found', 'not_found'));
  res.json(result);
};

module.exports = {
  create,
  getAll,
  getById
};
