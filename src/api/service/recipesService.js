const model = require('../models/recipesModel');
const { ObjectId } = require('mongodb');

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

const getAll = async () => {
  const recipes = await model.getAll();
  return recipes;
};

const recipeById = async (id) => {
  console.log('ta entrando no service');
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const recipe = await model.recipeById(id);
  console.log('recipe no service:', recipe);

  if (!recipe) {
    throw new Error('recipe not found');
  }
  return recipe;
};

module.exports = {
  createRecipe,
  getAll,
  recipeById,
};
