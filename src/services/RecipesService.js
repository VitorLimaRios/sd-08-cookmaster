const jwt = require('jsonwebtoken');
const RecipesModel = require('../models/RecipesModel');

const secret = 'trybe123';
const CREATED = 201;

const createRecipe = async (name, ingredients, preparation, token) => {
  const { id } = jwt.verify(token, secret);
  await RecipesModel.createRecipe(name, ingredients, preparation, id);
  const newRecipe = await RecipesModel.getRecipeByName(name);
  return { CREATED, message: { recipe: newRecipe }
  };
};

const getAllRecipes = async () => {
  const getAll = await RecipesModel.getAllRecipes();
  return getAll;
};

const getRecipeById = async (id) => {
  const getId = await RecipesModel.getRecipeById(id);
  return getId;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
