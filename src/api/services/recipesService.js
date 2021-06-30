const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const recipesSchema = require('../schema/recipesSchema');
const { created, unauthorized, ok } = require('../helpers/statusCode');
const { unauthorizedUser } = require('../helpers/errors');

const createRecipe = async (recipeData, token) => {
  console.log(recipeData);
  const validateBody = recipesSchema.validateRecipeCreation(recipeData);
  if (validateBody) return validateBody;

  const payload = recipesSchema.validateToken(token);
  if (payload.code === unauthorized) return payload;

  const { ops } = await recipesModel.insertOneRecipe(
    { ...recipeData, userId: payload['_id'] },
  );
  return { code: created, response: { recipe: ops[0] } };
};

const getAllRecipes = async () => {
  const recipesList = await recipesModel.getAllRecipes();
  return { code: ok, response: recipesList };
};

const getRecipeById = async (id) => {
  const invalidId = recipesSchema.validateId(id);
  if (invalidId) return invalidId;

  const recipeId = ObjectId(id);
  const recipe = await recipesModel.getRecipeById(recipeId);

  const invalidRecipe = recipesSchema.validateRecipe(recipe);
  if (invalidRecipe) return invalidRecipe;

  return { code: ok, response: recipe };
};

const updateRecipe = async (recipeData, id, token) => {
  const user = recipesSchema.validateRecipeEdition(token);
  if (user.code) return user;

  const invalidId = recipesSchema.validateId(id);
  if (invalidId) return invalidId;

  console.log(user);
  const recipeId = ObjectId(id);
  const { userId } = await recipesModel.getRecipeById(recipeId);

  console.log('user id', user['_id'], 'autor', userId);
  if (user['_id'].toString() === userId.toString() || user.role === 'admin') {
    const updatedRecipe = await recipesModel.updateRecipe(recipeData, recipeId);
    return { code: ok, response: updatedRecipe };
  }

  return { code: unauthorized, response: unauthorizedUser };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
