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

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  return recipe;
};

const update = async (recipeToUpdate ) => {
  const recipe = await recipeModel.update(recipeToUpdate);
  return recipe;
};

const exclude = async (id) => {
  const deletedRecipe = await recipeModel.getById(id);
  await recipeModel.exclude(id);
  return deletedRecipe;
};

const updateWithImage = async (recipeToUpdate, path ) => {
  const recipe = await recipeModel.updateWithImage(recipeToUpdate, path);
  return recipe;
};


module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
  updateWithImage
};
