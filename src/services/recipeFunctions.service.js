const { add, exclude, getAll, update, getById } = require('../models/recipe.model');

exports.createRecipe = async (entry) => {
  const recipe = await add(entry);
  return { recipe };
};

exports.getRecipeById = async (id) => {
  const recipe = await getById(id);
  if(!recipe ) throw new Error('recipe not found');
  return recipe;
};