const recipesModel = require('../models/recipesModel');

const addRecipe = async (theRecipe) => {
  const addingRecipe = await recipesModel.addRecipeToDb(theRecipe);
  return addingRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllTheRecipes();
  return allRecipes;
};

const getById = async (id) => {
  const searchById = await recipesModel.getRecipeById(id);
  return searchById;
};

module.exports = { getAllRecipes, getById, addRecipe };
