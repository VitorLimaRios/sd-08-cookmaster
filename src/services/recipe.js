const RecipeModel = require('../models/recipe');
const recipeSchema = require('../schema/recipe');
const createError = require('../utils/createError');

const create = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);

  if (error) return createError(error.message, 'invalid_recipe');

  return RecipeModel.create(recipe);
};

const getAll = () => RecipeModel.getAll();

module.exports = {
  create,
  getAll
};
