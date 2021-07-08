const Recipes = require('../models/recipes');
const recipeSchema = require('../schema/recipes');

const addRecipe = async (recipeInfo) => {
  console.log(recipeInfo);
  const { error } = recipeSchema.validate(recipeInfo);
  if (error) return {
    err: {
      message: 'Invalid entries. Try again.',
      status: 400,
    }
  };

  const newRecipe = await Recipes.addRecipe(recipeInfo);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipesList = await Recipes.getAllRecipes();
  return recipesList;
};

module.exports = {
  addRecipe,
  getAllRecipes,
};
