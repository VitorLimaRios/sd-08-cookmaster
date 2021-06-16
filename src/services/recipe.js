const RecipeModel = require('../models/recipe');
const recipeSchema = require('../schema/recipe');
const createError = require('../utils/createError');

const create = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);

  if (error) return createError(error.message, 'invalid_recipe');

  return RecipeModel.create(recipe);
};

const getAll = () => RecipeModel.getAll();

const getById = (recipeId) => RecipeModel.getById(recipeId);

const grantAccess = async (recipe, user) => {
  const { userId, role } = user;
  // O _id vem do mongodb como um objeto
  if (String(recipe.userId) === userId || role === 'admin') return true;
  return false;
};

const remove = async (recipeId, user) => {
  const recipe = await RecipeModel.getById(recipeId);

  if (!recipe) {
    return createError('Recipe not found');
  }

  if (!await grantAccess(recipe, user)) {
    return createError('Forbidden', 'forbidden');
  }

  const result = await RecipeModel.remove(recipeId);
  if (!result) return createError('Deletion failed');

  return result;
};

const edit = async (recipeId, updates, user) => {
  const recipe = await RecipeModel.getById(recipeId);

  if (!recipe) {
    return createError('Recipe not found');
  }

  if (!await grantAccess(recipe, user)) {
    return createError('Acesso negado', 'access_denied');
  }

  return RecipeModel.edit(recipeId, { ...updates, userId: user.userId });
};

const setImage = async (recipeId, image, user) => {
  const recipe = await RecipeModel.getById(recipeId);

  if (!recipe) {
    return createError('Recipe not found');
  }

  if (!await grantAccess(recipe, user)) {
    return createError('Acesso negado', 'access_denied');
  }

  return edit(recipeId, { ...recipe, image }, user);
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  remove,
  setImage
};
