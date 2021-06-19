const Recipes = require('../models/recipes');

const zeroRecipes = 0;

const getAll = async () => {
  const allRecipes = await Recipes.getAll();

  if (allRecipes.length === zeroRecipes) {
    return null;
  }
  return allRecipes;
};

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.create(name, ingredients, preparation, userId);
  return newRecipe;
};

module.exports = {
  getAll,
  create
};