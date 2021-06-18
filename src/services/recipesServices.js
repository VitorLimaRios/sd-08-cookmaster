const recipesModel = require('../models/recipesModel');
const { errors: {
  Recipes: {
    mustHaveName, mustHaveIngredients,
    mustHavePreparation, notFound, invalidToken } } } = require('../utils/errorsNCodes');

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

module.exports = { getAllRecipes, getById, addTheRecipe };
