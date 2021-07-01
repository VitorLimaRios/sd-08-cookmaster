const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const recipesSchema = require('../schema/recipesSchema');
const { created, unauthorized, ok, noContent } = require('../helpers/statusCode');
const { unauthorizedUser } = require('../helpers/errors');

const authorizedUser = (payloadId, userId, role) => {
  if (userId) {
    return payloadId.toString() === userId.toString() || role === 'admin';
  }
  return false;
};

const createRecipe = async (recipeData, token) => {
  console.log(recipeData);
  const validateBody = recipesSchema.validateRecipeCreation(recipeData);
  if (validateBody) return validateBody;

  const payload = recipesSchema.validateToken(token);
  if (payload.code) return payload;

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
  const payload = recipesSchema.validateToken(token);
  if (payload.code) return payload;

  const invalidId = recipesSchema.validateId(id);
  if (invalidId) return invalidId;

  const recipeId = ObjectId(id);
  const { userId } = await recipesModel.getRecipeById(recipeId);

  const { _id: payloadId, role } = payload;

  if (authorizedUser(payloadId, userId, role)) {
    const updatedRecipe = await recipesModel.updateRecipe(recipeData, recipeId);
    return { code: ok, response: updatedRecipe };
  }

  return { code: unauthorized, response: unauthorizedUser };
};

const deleteRecipe = async (id, token) => {
  const invalidId = recipesSchema.validateId(id);
  if (invalidId) return invalidId;
  const recipeId = ObjectId(id);

  const payload = recipesSchema.validateToken(token);
  if (payload.code) return payload;
  const { _id: payloadId, role } = payload;

  const recipe = await recipesModel.getRecipeById(recipeId);
  if (!recipe) return { code: unauthorized, response: unauthorizedUser };

  const { userId } = recipe;
  if (authorizedUser(payloadId, userId, role)) {
    const deletedRecipe = await recipesModel.deleteRecipe(recipeId);
    return { code: noContent, response: deletedRecipe };
  }

  return { code: unauthorized, response: unauthorizedUser };
};

const uploadImage = async (id, path) => {
  const recipeId = ObjectId(id);
  const recipe = await recipesModel.uploadImage(recipeId, path);
  return { code: ok, response: recipe };
};

module.exports = {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  uploadImage,
};
