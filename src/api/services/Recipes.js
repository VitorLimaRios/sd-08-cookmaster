const Recipes = require('../models/Recipes');

const newRecipe = async (name, ingredients, preparation, userId) =>
  Recipes.newRecipe(name, ingredients, preparation, userId);

module.exports = {
  newRecipe,
};
