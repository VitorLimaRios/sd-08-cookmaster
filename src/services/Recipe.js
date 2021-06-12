const recipeModel = require('../models/Recipe');

const create = async (id, newRecipe) => {
  const createdRecipe = await recipeModel.create(id, newRecipe);
  if (!createdRecipe) return null;
  return createdRecipe;
};

const getAll = async () => recipeModel.getAll();

const getById = async (id) => recipeModel.getById(id);

const edit = async (id, recipe) => recipeModel.edit(id, recipe);

module.exports = {
  create,
  getAll,
  getById,
  edit,
};