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



module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};