const recipe = require('../models/recipe');

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const post = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipeObject = await recipe.create(name, ingredients, preparation, req.userId);
  res.status(CREATED).json({ 'recipe': recipeObject.ops[0] });
};

const getAll = async (_req, res) => {
  res.status(OK).json(await recipe.getAll());
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeObject = await recipe.getOne(id);
    if (!recipeObject) res.status(NOT_FOUND).json({ 'message': 'recipe not found' });
    res.status(OK).json(recipeObject);
  } catch {
    res.status(NOT_FOUND).json({ 'message': 'recipe not found' });
  }
};

module.exports = {
  post,
  getAll,
  getOne,
};
