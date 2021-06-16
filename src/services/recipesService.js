const recipesModel = require('../models/recipesModel');
const { ObjectId } = require('mongodb');
const fs = require('fs/promises');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const createRecipes = async (recipes) => {
  const { name, ingredients, preparation, _id } = recipes;
  if(!name || !ingredients || !preparation)
    return { code: BAD_REQUEST, message: { message: 'Invalid entries. Try again.' } };
  const result = await recipesModel
    .createRecipes({ name, ingredients, preparation, _id });
  return {
    code: CREATED,
    message: {
      recipe: {
        name: result.name,
        ingredients: result.ingredients,
        preparation: result.preparation,
        userId: result.userId,
        _id: result._id,
      }
    }
  };
};

const getRecipes = async () => {
  const result = await recipesModel.getRecipes();
  return { code: OK, message: result };
};

const findRecipes = async (recipeId) => {
  const result = await recipesModel.findRecipes(recipeId);
  if (!result || result.error)
    return { code: NOT_FOUND, message: { message: 'recipe not found' } };
  return { code: OK, message: result };
};

const updateRecipes = async (userId, changes, recipeId) => {
  const result = await recipesModel.updateRecipes(recipeId, changes);
  return {
    code: OK,
    message: {
      _id: recipeId,
      name: changes.name,
      ingredients: changes.ingredients,
      preparation: changes.preparation,
      userId,
    },
  };
};

const deleteRecipes = async (recipeId) => {
  const result = await recipesModel.deleteRecipes(recipeId);
  return { code: NO_CONTENT, message: '' };
};

const imageUpdate = async (recipeId, file) => {
  const image = 'localhost:3000/' + file.destination + file.filename;
  recipesModel.imageUpdate(recipeId, image);
  const result = await recipesModel.findRecipes(recipeId);
  return { code: OK, message: result };
};

const getImage = async (recipeId) => {
  const { image } = await recipesModel.findRecipes(recipeId);
  const array = image.split('3000/');
  const filename = array[array.length - 1];
  console.log(filename);
  const localImage = await fs.readFile(filename, 'utf8');
  return { code: OK, message: localImage };
};

module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
  deleteRecipes,
  imageUpdate,
  getImage,
};
