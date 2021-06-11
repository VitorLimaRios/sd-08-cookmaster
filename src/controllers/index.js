const createUser = require('./users/createUser');
const login = require('./users/login');
const createRecipe = require('./recipes/createRecipe');
const getAllRecipes = require('./recipes/getAllRecipes');
const getRecipeById = require('./recipes/getRecipeById');

module.exports = {
  createUser,
  login,
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
