const recipesModels = require('../models/recipes');

const updateById = async (id, updatedProduct) => {
  const recipe = await recipesModels.updateById(id, updatedProduct);
  return recipe;
};

const deleteById = async (id) => {
  const deletedRecipe = await recipesModels.getById(id);
  await recipesModels.deleteById(id);
  return (deletedRecipe);
};

module.exports = {
  updateById,
  deleteById,
};