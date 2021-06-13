const recipeModel = require('../model/recipeModel');
const { ObjectId } = require('mongodb');
const validateEntries = require('./recipesValidations/validateEntries');
const erros_status = 404;

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

const getAllRecipes = async () => {
  const response = await recipeModel.getAllRecipes();
  if (!Array.isArray(response))
    return { err: { status: erros_status, message: 'something went wrong' } };
  return response;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id))
    return { err: { status: erros_status, message: 'recipe not found' } };
  const response = await recipeModel.getRecipeById(id);
  console.log(response);
  if (typeof response !== 'object')
    return { err: { status: erros_status, message: 'recipe not found' } };
  return response;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
};
