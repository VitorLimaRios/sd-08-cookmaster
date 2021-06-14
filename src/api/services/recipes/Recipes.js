const Recipe = require('../../models/recipes/Recipes');

const create = async (name, ingredients, preparation, userId) => await Recipe
  .create(name, ingredients, preparation, userId);
const getAll = async () => await Recipe.getAll();
const getRecipeById = async (id) => await Recipe.getRecipeById(id);

module.exports = {
  create,
  getAll,
  getRecipeById,
};
