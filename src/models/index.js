const createUser = require('./users/createUser');
const getUserByEmail = require('./users/getUserByEmail');
const createRecipe = require('./recipes/createRecipe');
const getAllRecipes = require('./recipes/getAllRecipes');
const getRecipeById = require('./recipes/getRecipeById');

module.exports = {
  createUser,
  getUserByEmail,
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
