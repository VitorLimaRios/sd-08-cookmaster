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

const getById = async (id) => {
  const recipeId = await recipes.getById(id);
  if(!recipeId) throw new Error('recipe not found');
  return recipeId;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
