const recipes = require('../Models/recipesModel');

const validateRecipe = (name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const invalid = validateRecipe(name, ingredients, preparation);
  if(invalid) {
    throw new Error(invalid);
  }
  return await recipes.create(name, ingredients, preparation, userId);
};

const getAll = async () => {
  const allRecipes = await recipes.getAll();
  return allRecipes;
};

module.exports = {
  createRecipe,
  getAll,
};
