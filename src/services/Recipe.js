const recipeModel = require('../models/Recipe');

const create = async (id, newRecipe) => {
  const createdRecipe = await recipeModel.create(id, newRecipe);
  if (!createdRecipe) return null;
  return createdRecipe;
};

module.exports = {
  create,
};