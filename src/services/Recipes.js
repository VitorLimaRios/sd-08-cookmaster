const Recipes = require('../models/Recipes');

const create = async (recipe, userId) => Recipes.create(recipe, userId);

const get = async () => Recipes.get();

module.exports = {
  create,
  get
};