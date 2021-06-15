const recipes = require('../models/recipesModel');

const isValid = (name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  };

  return undefined;
};

const createRecipes = async (name, ingredients, preparation, userId) => {
  const notValid = isValid(name, ingredients, preparation);

  if (notValid) {
    throw new Error(notValid);
  }

  const newRecipe = await recipes.createRecipe(name, ingredients, preparation, userId);
  return newRecipe;
};

const getAllRecipes = async () => await recipes.getAll();

const getRecipeById = async (id) => {
  const recipe = await recipes.getById(id);
  if (recipe === null) {
    throw new Error('recipe not found');
  }

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updateRecipes = await recipes.update(id, name, ingredients, preparation);
  return updateRecipes;
};

const excludeRecipe = async (id) => {
  await recipes.exclude(id);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  excludeRecipe,
};