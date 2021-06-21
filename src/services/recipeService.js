const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');
const { ObjectId } = require('mongodb');
const fs = require('fs/promises');

const ok = 200;
const created = 201;
const error = 400;
const error_token = 401;
const notfound = 404;
const exclude = 204;

const createRecipe = async (recipe) => {
  const { name, ingredients, preparation, _id } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      code: error,
      message: {
        message: 'Invalid entries. Try again.'
      }
    };
  }
  const response = await recipeModel
    .createRecipe({ name, ingredients, preparation, _id });
  return {
    code: created,
    message: {
      recipe: {
        name: response.name,
        ingredients: response.ingredients,
        preparation: response.preparation,
        userId: response.userId,
        _id: response._id,
      }
    }
  };
};

const getAllRecipes = async () => {
  const response = await recipeModel.getAllRecipes();
  return { code: ok, message: response };
};

const getRecipeById = async (recipeId) => {
  const response = await recipeModel.getRecipeById(recipeId);
  if (!response || response.error) {
    return {
      code: notfound,
      message: {
        message: 'recipe not found'
      }
    };
  }
  return { code: ok, message: response };
};

const updateRecipe = async (userId, data, recipeId) => {
  await recipeModel.updateRecipe(recipeId, data);
  return {
    code: ok,
    message: {
      _id: recipeId,
      name: data.name,
      ingredients: data.ingredients,
      preparation: data.preparation,
      userId,
    },
  };
};

const deleteRecipe = async (recipeId) => {
  await recipeModel.deleteRecipe(recipeId);
  return { code: exclude, message: '' };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
