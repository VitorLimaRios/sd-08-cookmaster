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
  if(!ObjectId.isValid(id)) return null;
};


module.exports = {
  create,
  getAll,
  findById
};
