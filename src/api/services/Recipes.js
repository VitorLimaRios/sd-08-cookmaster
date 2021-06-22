const Recipes = require('../models/Recipes');

const getAll = async () => Recipes.getAll();

const findById = async (id) => {
  const recipe = await Recipes.findById(id);
  if (!recipe) return { message: 'recipe not found' };

  return recipe;
};

const newRecipe = async (name, ingredients, preparation, userId) =>
  Recipes.newRecipe(name, ingredients, preparation, userId);

module.exports = {
  getAll,
  findById,
  newRecipe,
};
