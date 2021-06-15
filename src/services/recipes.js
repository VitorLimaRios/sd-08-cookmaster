const RecipeModel = require('../models/Recipe');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const invalidEntries = validateRecipe(name, ingredients, preparation);
  if (invalidEntries) {
    throw new Error(invalidEntries);
  }
  return await RecipeModel.createRecipe(name, ingredients, preparation, userId);
};

module.exports = {
  createRecipe,
};
