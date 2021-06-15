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

const grantAccess = async (recipeId, user) => {
  const { userId, role } = user;
  const recipe = await getById(recipeId);
  if (recipe._id !== userId && role !== 'admin') return false;
  return true;
};

const remove = async (id, user) => {
  if (!grantAccess(id, user)) {
    return createError('Forbidden', 'forbidden');
  }
  const result = await RecipeModel.remove(id);
  if (!result) return createError('Deletion failed');
  return result;
};

const edit = async (recipeId, updates, user) => {
  if (!grantAccess(recipeId, user)) {
    return createError('Acesso negado', 'access_denied');
  }
  return RecipeModel.edit(recipeId, { ...updates, userId: user.userId });
};

const setImage = async (recipeId, image, user) => {
  if (!grantAccess(recipeId, user)) {
    return createError('Acesso negado', 'access_denied');
  }

  const recipe = await getById(recipeId);
  if (!recipe) return createError('Not found');

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
