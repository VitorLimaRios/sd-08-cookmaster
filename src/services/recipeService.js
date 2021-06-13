const recipeModel = require('../model/recipeModel');
const validateEntries = require('./recipesValidations/validateEntries');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const isValidEntries = validateEntries(name, ingredients, preparation);
  if (isValidEntries.err) return isValidEntries;
  const response = await recipeModel.registerRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return response;
};

module.exports = {
  registerRecipe,
};
