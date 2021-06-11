const createUser = require('./users/createUser');
const login = require('./users/login');
const createRecipe = require('./recipes/createRecipe');
const getAllRecipes = require('./recipes/getAllRecipes');

module.exports = {
  createUser,
  login,
  createRecipe,
  getAllRecipes,
};
