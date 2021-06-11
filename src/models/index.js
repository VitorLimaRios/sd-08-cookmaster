const createUser = require('./users/createUser');
const getUserByEmail = require('./users/getUserByEmail');
const createRecipe = require('./recipes/createRecipe');
const getAllRecipes = require('./recipes/getAllRecipes');
const getRecipeById = require('./recipes/getRecipeById');
const updateRecipe = require('./recipes/updateRecipe');
const removeRecipe = require('./recipes/removeRecipe');

module.exports = {
  createUser,
  getUserByEmail,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
};
