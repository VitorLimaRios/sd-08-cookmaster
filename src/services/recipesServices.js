const recipesModel = require('../models/recipesModel');
const { errors: {
  Recipes: {
    mustHaveName, mustHaveIngredients,
    mustHavePreparation } } } = require('../utils/errorsNCodes');

const addTheRecipe = async (theRecipe, theToken) => {
  const { name, ingredients, preparation } = theRecipe;
  if (!name) throw new Error(JSON.stringify(mustHaveName));
  if (!ingredients) throw new Error(JSON.stringify(mustHaveIngredients));
  if (!preparation) throw new Error(JSON.stringify(mustHavePreparation));
  const addingRecipe = await recipesModel.addRecipeToDb(theRecipe, theToken);
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

const updateRcpById = async (id, updateData) => {
  const updatingTheRecipe = await recipesModel.updateRecipeById(id, updateData);
  return updatingTheRecipe;
};

const deleteRcpById = async (id) => {
  const deletingRcp = await recipesModel.deleteRecipeById(id);
  return deletingRcp;
};

module.exports = { getAllRecipes, getById, addTheRecipe, updateRcpById, deleteRcpById };
