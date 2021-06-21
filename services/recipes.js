const model = require('../models/recipes');
const { ObjectId, ObjectID } = require('mongodb');
const INVALID = {
  message: 'Invalid entries. Try again.'
};

const RECIPE_NOT_FOUND = {
  message: 'recipe not found'
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  (!name || !ingredients || !preparation) && new Error(INVALID);
  
  const newRecipe = await model.createRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return newRecipe;
};

const getAll = async () => await model.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const recipeById = await model.getById(id);
  (!recipeById) && new Error(RECIPE_NOT_FOUND);
  return recipeById;
};

const update = async ({ id, name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const updatedRecipe = await model.update({ 
    id,
    name,
    ingredients,
    preparation,
    userId,
  });

  (!updatedRecipe) && new Error(INVALID);

  return updatedRecipe;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const removeRecipe = await model.remove(id);
  !removeRecipe && null;
  return removeRecipe;
};

const uploadImage = async (id, path) => {
  const updateImage = await model.uploadImage(id, path);
  !updateImage && null;
  return updateImage;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  remove,
  uploadImage,
}; 