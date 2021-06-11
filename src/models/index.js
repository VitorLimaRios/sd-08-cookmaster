const createUser = require('./users/createUser');
const getUserByEmail = require('./users/getUserByEmail');
const createRecipe = require('./recipes/createRecipe');
const getAllRecipes = require('./recipes/getAllRecipes');

module.exports = {
  createUser,
  getUserByEmail,
  createRecipe,
  getAllRecipes,
};
