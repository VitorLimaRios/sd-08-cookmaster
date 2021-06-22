const ListRecipes = require('../models/ListRecipes');

const OK = 200;
const NOT_FOUND = 404;

const ListRecipesMiddleware = async (req, res) => {
  const { id } = req.params;
  const recipes = await ListRecipes(id);

  if (!recipes) return res.status(NOT_FOUND).json({ message: 'recipe not found' });

  return res.status(OK).json(recipes);
};

module.exports = ListRecipesMiddleware;