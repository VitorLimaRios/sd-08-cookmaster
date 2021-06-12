const rescue = require('express-rescue');
const RecipesService = require('../services/RecipesService');

const OK_STATUS = 200;

module.exports = rescue(async (req, res) => {
  const recipes = await RecipesService.getAll();
  return res.status(OK_STATUS).json(recipes);
});