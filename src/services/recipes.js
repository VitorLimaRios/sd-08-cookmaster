const Recipes = require('../models/recipes');
const recipeSchema = require('../schema/recipes');
const { ObjectId } = require('mongodb');

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

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      message: 'recipe not found',
      status: 404,
    }
  };

  const recipeById = await Recipes.getRecipeById(id);

  if (!recipeById) return {
    err: {
      message: 'recipe not found',
      status: 404,
    }
  };

  return recipeById;
};

const updateRecipeById = async (id, newRecipeInfo, user) => {
  await Recipes.updateRecipeById(id, newRecipeInfo);

  const updatedRecipe = { _id: id, ...newRecipeInfo, userId: user._id };

  return updatedRecipe;
};

const deleteRecipeById = async (id) => {
  await Recipes.deleteRecipeById(id);
};

const addRecipeImage = async (id, recipeImage) => {
  const recipeById = await Recipes.getRecipeById(id);
  const recipeWithImage = { ...recipeById, image: recipeImage };

  await Recipes.updateRecipeById(id, { image: recipeImage });

  return recipeWithImage;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addRecipeImage,
};
