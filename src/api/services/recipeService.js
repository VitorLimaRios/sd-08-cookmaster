const RecipeModel = require('../models/recipeModel');
const RecipeValidations = require('./recipeValidations');

const create = async (newRecipe, userId) => {
  const { name, ingredients, preparation } = newRecipe;
  
  RecipeValidations.validateNameIsRequire(name);
  RecipeValidations.validateIngredientsIsRequire(ingredients);
  RecipeValidations.validatePreparationIsRequire(preparation);

  newRecipe.userId = userId;

  const createdRecipe = await RecipeModel.create(newRecipe);

  return { recipe: { ...createdRecipe } };
};

const getAll = async () => {
  const allRecipes = await RecipeModel.getAll();

  return allRecipes;
};

module.exports = {
  create,
  getAll,
};
