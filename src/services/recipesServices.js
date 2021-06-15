const recipesModel = require('../models/recipesModel');
const { ObjectId } = require('mongodb');
const { code, message } = require('../helpers/messages');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if(!name || !ingredients || !preparation) {
    throw new Error({ 'message': message.INVALID_ENTRIES });
  };
  const newRecipe = await recipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) throw new Error('recipe not found');
  return recipe;
};

const updateRecipe = async (id,name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const newRecipe = await recipesModel.updateRecipe(id, name, ingredients, preparation);

  return newRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};