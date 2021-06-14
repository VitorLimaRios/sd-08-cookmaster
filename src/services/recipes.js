const recipesModel = require('../models/recipes');
const usersModel = require('../models/users');
const validations = require('./validations');

const { ObjectId } = require('mongodb');

const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

const readRecipes = () => recipesModel.readRecipes();

const readRecipeById = async(id) => {
  validations.isFalse(ObjectId.isValid(id));

  const recipe = await recipesModel.readRecipesById(id);

  validations.isFalse(recipe);

  return recipe;
};

const createRecipe = async(recipe, token) => {
  validations.recipeBodyRequest(recipe);

  const { data } = jwt.verify(token, secret);

  const { _id: userId } = await usersModel.readByKey('email', data.email);

  const newRecipe = {
    ...recipe,
    userId,
  };

  const { insertedId: _id } = await recipesModel.createRecipe(newRecipe);

  return {
    ...newRecipe,
    _id,
  };
};

const updateRecipe = async (token, recipe, id) => {
  validations.isFalse(ObjectId.isValid(id));
  validations.recipeBodyRequest(recipe);

  const { data } = jwt.verify(token, secret);
  const recipeExists = await recipesModel.readRecipesById(id);

  validations.doYouHavePermission(recipeExists, data);

  const updated = await recipesModel.updateRecipe(recipe, id);

  return {
    ...recipeExists,
    ...recipe
  };
};

const deleteRecipe = async (token, id) => {
  validations.isFalse(ObjectId.isValid(id));

  const { data } = jwt.verify(token, secret);
  const recipe = await recipesModel.readRecipesById(id);

  validations.doYouHavePermission(recipe, data);

  const deleted = await recipesModel.deleteRecipe(id);
};

const addImageById = async(token, id, image) => {
  validations.isFalse(ObjectId.isValid(id));

  const { data } = jwt.verify(token, secret);
  const recipe = await recipesModel.readRecipesById(id);

  validations.doYouHavePermission(recipe, data);

  const newRecipe = {
    ...recipe,
    image,
  };

  const updated = await recipesModel.updateRecipe(newRecipe, id);

  return newRecipe;
};


module.exports = {
  readRecipes,
  readRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addImageById,
};