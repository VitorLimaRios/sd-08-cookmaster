const recipesModels = require('../models/recipesModels');

const jwt = require('jsonwebtoken');
const secret = 'trybe-t8';

const createRecipes = async (name, ingredients, preparation, userId) => {
  // const { id } = jwt.verify(token, secret);
  const result = await recipesModels.createRecipes(name,
    ingredients, preparation, userId);
  return result;
};

const getAllRecipes = async () => {
  const result = await recipesModels.getAllRecipes();
  return result;
};

const getByRecipes = async (id,) => {
  const result = await recipesModels.getByRecipes(id);
  return result;
};

const updateRecipes = async (id, upRecipe, userId) => {
  const result = await recipesModels.updateRecipes(id,
    upRecipe, userId);
  return result;
};
module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
  updateRecipes,
};