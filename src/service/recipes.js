const recipesModels = require('../models/recipes');

const updateById = async (id, updatedRecipe, userId) => {
  const recipe = await recipesModels.updateById(id, updatedRecipe, userId);
  return recipe;
};

const deleteById = async (id) => {
  const deletedRecipe = await recipesModels.getById(id);
  await recipesModels.deleteById(id);
  return (deletedRecipe);
};

const addImage = async (id, url) => {
  const recipe = await recipesModels.getById(id);
  const imageRecipe= { recipe, image: url };
  await recipesModels.updateById(id, { image: url });
  return imageRecipe;
};

const getImage = async (id) => {
  const _id = id.split('.');
  const recipe = await recipesModels.getById(_id);
  if (!recipe) return 'recipe not found';
  return recipe.image;
};

module.exports = {
  updateById,
  deleteById,
  addImage,
  getImage,
};