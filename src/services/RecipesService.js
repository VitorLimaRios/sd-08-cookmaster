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

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const update = await RecipesModel.updateRecipeById(id, name, ingredients, preparation);
  return update;
};

const deleteRecipe = async (id) => {
  const deleteById = await RecipesModel.deleteRecipe(id);
  return deleteById;
};

const updateImage = async (id, filename) => {
  const getImage = await RecipesModel.updateImage(id, filename);
  return getImage;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipe,
  updateImage
};
