const model = require('../models/recipesModel');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const invalid = validateRecipe(name, ingredients, preparation);
  if (invalid) {
    throw new Error(invalid);
  }
  return await model.createRecipe(name, ingredients, preparation, userId);
};

module.exports = {
  createRecipe,
};
