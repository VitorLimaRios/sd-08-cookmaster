const { ObjectId } = require('mongodb');
const RecipesModel = require('../models/RecipesModel');

const create = async (userId, recipe) => {
  const { name, ingredients, preparation } = recipe;
  if(!name || !ingredients || !preparation) return {
    error: {
      code: 400,
      message: 'Invalid entries. Try again.'
    }
  };

  const newRecipe = await RecipesModel.create(userId, recipe);
  return newRecipe;
};

const getAll = async () => {
  const recipes = await RecipesModel.getAll();
  return recipes;
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return {
    error: {
      code: 404,
      message: 'recipe not found'
    }
  };
  const recipe = await RecipesModel.findById(id);
  if(!recipe) return {
    error: {
      code: 404,
      message: 'recipe not found'
    }
  };
  return recipe;
};


module.exports = {
  create,
  getAll,
  findById
};
