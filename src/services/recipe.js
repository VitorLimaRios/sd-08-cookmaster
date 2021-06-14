const RecipeModel = require('../models/recipe');
const recipeSchema = require('../schema/recipe');
const createError = require('../utils/createError');

const create = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);

  if (error) return createError(error.message, 'invalid_recipe');

  return RecipeModel.create(recipe);
};

const getAll = () => RecipeModel.getAll();

const getById = (id) => RecipeModel.getById(id);

const isOwner = async (recipeId, userId) => {
  const recipe = await getById(recipeId);
  return recipe._id == userId;
};

const edit = async (recipeId, updates, user) => {
  if (!isOwner(recipeId, user.userId) && user.role !== 'admin') {
    return createError('Acesso negado', 'access_denied');
  }

  return RecipeModel.edit(recipeId, { ...updates, userId: user.userId });
};

module.exports = {
  create,
  getAll,
  getById,
  edit
};
