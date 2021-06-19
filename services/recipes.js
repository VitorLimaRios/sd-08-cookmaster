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

module.exports = {
  createRecipe,
  getAll,
  getById,
}; 