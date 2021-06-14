const createUser = require('./users/createUser');
const login = require('./users/login');
const createRecipe = require('./recipes/createRecipe');
const getAllRecipes = require('./recipes/getAllRecipes');
const getRecipeById = require('./recipes/getRecipeById');
const updateRecipe = require('./recipes/updateRecipe');
const removeRecipe = require('./recipes/removeRecipe');
const uploadImage = require('./recipes/uploadImage');
const getImage = require('./recipes/getImage');
const createAdmin = require('./users/createAdmin');

module.exports = {
  createUser,
  login,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  uploadImage,
  getImage,
  createAdmin,
};
