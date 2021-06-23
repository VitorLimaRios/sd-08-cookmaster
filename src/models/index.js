const { createUser, findUser, createAdmin } = require('./user');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadFile,
} = require('./recipe');

module.exports = {
  createUser,
  findUser,
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadFile,
  createAdmin,
};