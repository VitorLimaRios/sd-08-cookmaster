const Recipes = require('../models/Recipes');

const create = async (recipe) => Recipes.create(recipe);

module.exports = {
  create,
};