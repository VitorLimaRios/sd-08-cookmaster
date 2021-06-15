const { add, exclude, getAll, update, getById } = require('../models/recipe.model');

exports.createRecipe = async (entry) => {
  const recipe = await add(entry);
  return { recipe };
};