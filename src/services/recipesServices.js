const recipesModel = require('../models/recipesModel');
const { code, message } = require('../helpers/messages');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if(!name || !ingredients || !preparation) {
    throw new Error({ 'message': message.INVALID_ENTRIES });
  };
  const newRecipe = await recipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};