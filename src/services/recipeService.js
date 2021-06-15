const Joi = require('@hapi/joi');

const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const validateRecipe = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  userId: Joi.required()
});

const createRecipe = async (recipeData) => {
  const { error } = validateRecipe.validate(recipeData);
  if (error) return { bad_request: true };
 
  const newRecipe = await recipeModel.createRecipe(recipeData);
  return newRecipe;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return null;

  return recipe;
};

const editRecipe = async (id, recipeData, userId) => {
  const recipe = await recipeModel.getRecipeById(id);
  const user = await userModel.getUserById(recipe.userId);

  if (!user.role === 'admin' && !userId.equals(recipe.userId)) {
    return null;
  }
  
  const editedRecipe = await recipeModel.editRecipe(id, recipeData);

  if (!editedRecipe) return null;

  return editedRecipe;
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await recipeModel.deleteRecipe(id);

  if (!deletedRecipe) return null;

  return true;
};

module.exports = { createRecipe, getRecipes, getRecipeById, editRecipe, deleteRecipe };
