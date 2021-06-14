const RecipeModel = require('../models/recipeModel');
const RecipeValidations = require('../validations/recipeValidations');

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

const findById = async (id) => {
  RecipeValidations.validateRecipeId(id);
  
  const recipe = await RecipeModel.findById(id);

  RecipeValidations.validateRecipeNotFound(recipe);
  
  return recipe;
};

const update = async (id, newRecipe, userId) => {
  RecipeValidations.validateRecipeId(id);
  
  return await RecipeModel.update(id, newRecipe, userId);
};

const exclude = async (id) => {
  RecipeValidations.validateRecipeId(id);
  
  const deletedRecipe = await RecipeModel.exclude(id);

  return deletedRecipe;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
