
const RecipeModel = require('../models/recipe');
const RecipeSchema = require('../schema/recipe');
const { customError, getAccess } = require('../utils');

const createRecipe = async (recipe) => {
  const { error } = RecipeSchema.validate(recipe);

  if (error) return customError('Invalid entries. Try again.', 'invalid_recipe');

  return RecipeModel.createRecipe(recipe);
};

const getAllRecipes = () => RecipeModel.getAllRecipes();

const getRecipeById = (recipeId) => RecipeModel.getRecipeById(recipeId);

const editRecipe = async (recipeId, updates, user) => {
  const recipe = await RecipeModel.getRecipeById(recipeId);

  if (!recipe) {
    return customError('Recipe not found');
  }

  if (!await getAccess(recipe, user)) {
    return customError('Acesso negado', 'access_denied');
  }

  return RecipeModel.editRecipe(recipeId, { ...updates, userId: user.userId });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe
};
