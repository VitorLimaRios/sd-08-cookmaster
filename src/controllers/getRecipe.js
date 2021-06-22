const rescue = require('express-rescue');

const Services = require('../services/recipe');

const SUCCEEDED = 200;

module.exports = rescue(async (_req, res) => {
  const recipes = await Services.getRecipes();
  if (!recipes) throw Error;
  res.status(SUCCEEDED).json(recipes);
});
