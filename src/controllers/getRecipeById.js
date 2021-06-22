const rescue = require('express-rescue');

const Services = require('../services/recipe');

const SUCCEEDED = 200;

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Services.getRecipeById(id);
  if (!recipe) throw Error;
  res.status(SUCCEEDED).json(recipe);
});
