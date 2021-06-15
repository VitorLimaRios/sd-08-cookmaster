const { add, exclude, getAll, update, getById } = require('../models/recipe.model');
const { verifyUserAdmin } = require('../services/userManagement.service');

exports.createRecipe = async (entry) => {
  const recipe = await add(entry);
  return { recipe };
};

exports.getRecipeById = async (id) => {
  const recipe = await getById(id);
  if(!recipe ) throw new Error('recipe not found');
  return recipe;
};

exports.updateRecipe = async ( _id, { userId, ...entry }) => {
  const recipe = await getById(_id);
  if(!recipe) throw new Error('recipe not found');

  const auth = recipe.userId === userId;
  if(!auth && !await verifyUserAdmin(userId)) throw new Error('');
  await update(entry);
  return {
    _id,
    ...entry,
    userId,
  };
};