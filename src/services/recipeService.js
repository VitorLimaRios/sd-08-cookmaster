const recipeModel = require('../models/recipeModel');
const jwt = require('jsonwebtoken');

const secret = 'issoesegredo';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const add = async (name, ingredients, preparation, userId) => {
  if ([!name, !ingredients, !preparation].includes(true)) {
    return undefined;
  }
  const addedRecipe = await recipeModel.add(
    name,
    ingredients,
    preparation,
    userId
  );
  return addedRecipe;
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

module.exports = {
  add,
  getAll,
};
