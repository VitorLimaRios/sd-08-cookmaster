const model = require('../models/recipesModel');
const { ObjectId } = require('mongodb');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new Error('Invalid entries. Try again.');
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
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const recipe = await model.recipeById(id);

  if (!recipe) {
    throw new Error('recipe not found');
  }
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const invalid = validateRecipe(name, ingredients, preparation);
  if (invalid) {
    throw new Error(invalid);
  }
  const updateThisRecipe = await model.updateRecipe(id, name, ingredients, preparation);
  return updateThisRecipe;
};

const deleteRecipe = async (id) => {
  const recipeDeleted = await model.deleteRecipe(id);
  return recipeDeleted;
};

module.exports = {
  createRecipe,
  getAll,
  recipeById,
  updateRecipe,
  deleteRecipe,
};
