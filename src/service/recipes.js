const recipesModels = require('../models/recipes');

const updateById = async (updatedProduct) => {
  const recipe = await recipesModels.updateById(updatedProduct);
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