const recipesModel = require('../models/recipesModel');
const { ObjectId } = require('mongodb');

const getAllRecipes = async () => recipesModel.getAll();

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await recipesModel.findById(id);
  
  if(!recipe) return null;

  return recipe;
}

const updateRecipeById = async (id, name, ingredients, preparation, userId) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await recipesModel.updateById(id, name, ingredients, preparation, userId);
  
  if(!recipe) return null;

  return recipe;
}

const deleteRecipeById = async (recipeId, user) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const { role, id } = user;

  const recipe = await recipesModel.findById(recipeId);

  if (recipe.userId === id || role === 'admin') {
    await recipesModel.deleteById(recipeId)
  } else {
    return { message: "something bad happened" };
  };
}

const createRecipe = async (name, ingredients, preparation, userId) =>
  recipesModel.create(name, ingredients, preparation, userId);

module.exports = {
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  createRecipe,
  deleteRecipeById
};
