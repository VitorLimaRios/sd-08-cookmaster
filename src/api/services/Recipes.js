const Recipes = require('../models/Recipes');

const getAll = async () => Recipes.getAll();

const newRecipe = async (name, ingredients, preparation, userId) =>
  Recipes.newRecipe(name, ingredients, preparation, userId);

module.exports = {
  getAll,
  newRecipe,
};
