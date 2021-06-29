const { ObjectId } = require('mongodb');
const RecipesModels = require('../models/RecipesModels');

const isValidRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new Error('Invalid entries. Try again.');
  }
  return undefined;
};

const addNewRecipe = async (name, ingredients, preparation, userId) => {

  const isNotValid = isValidRecipe(name, ingredients, preparation);

  if (isNotValid) {
    throw new Error(isNotValid);
  }

  let addedRecipe = await RecipesModels
    .addNewRecipe(name, ingredients, preparation, userId);

  return addedRecipe;
};

const getAllRecipes = () => {

  const recipesToList = RecipesModels
    .getAllRecipes();
    
  return recipesToList;
};

const getAllById = async (id) => {
  
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');

  const result = await RecipesModels
    .getAllById(id);

  if (!result) {
    throw new Error('recipe not found');
  }

  return result;
};

const recipeToUpdate = async (id, name, ingredients, preparation) => {

  const isNotValid = isValidRecipe(name, ingredients, preparation);

  if (isNotValid) {
    throw new Error(isNotValid);
  }

  const result = await RecipesModels
    .recipeToUpdate(id, name, ingredients, preparation);

  return result;
};
  
const recipeToDelete = async (id) => {

  const result = await RecipesModels
    .recipeToDelete(id);

  return result;
};

const addNewRecipeImage = async (id, image) => {
  const imageToAdd = await RecipesModels.addNewRecipeImage(id, image);
  return imageToAdd;
};
  
module.exports = {
  addNewRecipe,
  getAllRecipes,
  getAllById,
  recipeToDelete,
  recipeToUpdate,
  addNewRecipeImage,
};