const Recipes = require('../models/Recipes');

const create = async (recipe, userId) => Recipes.create(recipe, userId);

const get = async () => Recipes.get();

const getById = async (id) => {
  const recipe = await Recipes.getById(id);

  if (!recipe) {
    return {
      error: {
        code: 404,
        message: 'recipe not found'
      }
    };
  }

  return recipe;
};

module.exports = {
  create,
  get,
  getById
};