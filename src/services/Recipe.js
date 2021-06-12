const recipeModel = require('../models/Recipe');

const create = async (id, newRecipe) => {
  const createdRecipe = await recipeModel.create(id, newRecipe);
  if (!createdRecipe) return null;
  return createdRecipe;
};

const getAll = async () => recipeModel.getAll();

const getById = async (id) => recipeModel.getById(id);

module.exports = {
  create,
  getAll,
  getById,
};