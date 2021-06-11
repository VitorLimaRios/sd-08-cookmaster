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

module.exports = {
  readRecipes,
  readRecipeById,
  createRecipe,
};