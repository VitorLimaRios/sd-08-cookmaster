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

const update = async (updatedRecipe, recipeId, user) => {
  const { userId: ownerId } = await Recipes.getById(recipeId);

  const userId = user._id;

  if (!(ownerId.equals(userId)) && user.role !== 'admin') {
    return {
      error: {
        code: 403,
        message: 'Forbidden'
      }
    };
  }

  return Recipes.update(updatedRecipe, recipeId, userId);
};

const remove = async (id) => {
  const recipeExists = await Recipes.getById(id);

  if (!recipeExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }

  return Recipes.remove(id);
};

module.exports = {
  create,
  get,
  getById,
  update,
  remove
};