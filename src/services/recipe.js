
const RecipeModel = require('../models/recipe');
const RecipeSchema = require('../schema/recipe');
const { customError } = require('../utils');

const createRecipe = async (recipe) => {
  const { error } = RecipeSchema.validate(recipe);

  if (error) return customError('Invalid entries. Try again.', 'invalid_recipe');

  return RecipeModel.createRecipe(recipe);
};

const getAllRecipes = () => RecipeModel.getAllRecipes();

const getRecipeById = (recipeId) => RecipeModel.getRecipeById(recipeId);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
