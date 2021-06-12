const recipe = require('../models/recipe');

const OK = 200;
const CREATED = 201;

const post = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipeObject = await recipe.create(name, ingredients, preparation, req.userId);
  res.status(CREATED).json({ 'recipe': recipeObject.ops[0] });
};

const getAll = async (_req, res) => {
  res.status(OK).json(await recipe.getAll());
};

module.exports = {
  post,
  getAll,
};
