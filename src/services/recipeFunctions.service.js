const { add, exclude, getAll, update, getById } = require('../models/recipe.model');

exports.createRecipe = async (entry) => {
  const recipe = await add(entry);
  return { recipe };
};

exports.getRecipeById = async (id) => {
  const recipe = await getById(id);
  if(!recipe ) throw new Error('recipe not found');
  return recipe;
};

exports.updateRecipe = async ( _id, { user, ...entry }) => {
  const recipe = await getById(_id);
  if(!recipe) throw new Error('recipe not found');
  const auth = recipe.userId === user._id;
  const isAdmin = user.role === 'admin';

  if(!auth && !isAdmin) throw new Error('');
  await update(_id, entry);
  
  return {
    ...recipe,
    ...entry,
    userId: user._id,
  };
};

exports.excludeRecipe = async (id) => {
  const recipe = !! await getById(id);
  if(!recipe) throw new Error('recipe not found');
  await exclude(id);
};
