const recipesModels = require('../models/recipesModels');
const { ObjectId } = require('mongodb');
const { status, message } = require('../schema/status');

const getAll = async () => {
  const recipes = await recipesModels.getAllRecipes();
  return recipes;
};

const updateRecipeById = async (id, recipe, userId) => {  
  return await recipesModels.updateRecipeById(id, recipe, userId);
};

const deleteRecipeById = async (id) => {
  return await recipesModels.deleteRecipeById(id);
};

module.exports = {
  getAll,
  updateRecipeById,
  deleteRecipeById,
};
