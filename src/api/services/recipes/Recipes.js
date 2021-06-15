const Recipe = require('../../models/recipes/Recipes');

const create = async (name, ingredients, preparation, userId) => await Recipe
  .create(name, ingredients, preparation, userId);
const getAll = async () => await Recipe.getAll();
const getRecipeById = async (id) => await Recipe.getRecipeById(id);
const update  = async (id, name, ingredients, preparation) => await Recipe
  .update(id, name, ingredients, preparation);
const deleteRecipe = async (id) => await Recipe.deleteRecipe(id);

module.exports = {
  create,
  getAll,
  getRecipeById,
  update,
  deleteRecipe,
};
