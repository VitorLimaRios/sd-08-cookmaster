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
  
module.exports = {
  addNewRecipe,
  getAllRecipes,
};