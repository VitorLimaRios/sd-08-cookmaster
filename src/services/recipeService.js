const recipeModel = require('../model/recipeModel');
const { ObjectId } = require('mongodb');
const validateEntries = require('./recipesValidations/validateEntries');
const validateName = require('./userValidation/validateName');
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
  if (typeof response !== 'object')
    return { err: { status: erros_status, message: 'recipe not found' } };
  return response;
};

const updateRecipeById = async (id, infosToUpdate, role, email) => {
  const { name, ingredients, preparation } = infosToUpdate;
  const recipeToUpdate = await recipeModel.getRecipeById(id);
  const { userId } = recipeToUpdate;
  // // const verifyNameLogged = await validateName(userId, email, role);
  // if (verifyNameLogged)
  //   return { status: erros_status, message: 'not allowed to update' };
  await recipeModel.updateRecipeById(id, name, ingredients, preparation);
  return { _id: id, name, ingredients, preparation, userId };
};

const deleteRecipeById = async (id) => {
  await recipeModel.deleteRecipeById(id);
  return {};
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
