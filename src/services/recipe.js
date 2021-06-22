const { ObjectId } = require('mongodb');

const Utils = require('../utils');
const Models = require('../models');

const invalidEntries = 'Invalid entries. Try again.';
const notFound = 'recipe not found';
const missingToken = 'missing auth token';

const createRecipe = async (token, name, ingredients, preparation) => {
  // console.log('SERVICE createRecipe req.body', { token, name, ingredients, preparation });
  
  const decoded = Utils.tokenDecrypt(token);
  // console.log('SERVICE createRecipe decoded', decoded);
  const user = await Models.findUser(decoded.email);
  // console.log('SERVICE createRecipe user', user);
  if (!user) throw Error(invalidEntries);

  const { error } = Utils.validateRecipeData({ name, ingredients, preparation });
  // console.log('SERVICE createRecipe error', error);
  if (error) throw Error(invalidEntries);

  const recipe = await Models.createRecipe(name, ingredients, preparation);
  // console.log('SERVICE createRecipe recipe', recipe);
  return recipe;
};

const getRecipes = async () => {
  const recipes = await Models.getRecipes();
  // console.log('SERVICE getRecipes recipes', recipes);
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) throw Error(notFound);
  const recipe = await Models.getRecipeById(id);
  // console.log('SERVICE getRecipeById recipe', recipe);
  if (!recipe) throw Error(notFound);
  return recipe;
};

const editRecipeById = async (token, id, recipeData) => {
  const decoded = Utils.tokenDecrypt(token);
  // console.log('SERVICE editRecipeById decoded', decoded);
  const user = await Models.findUser(decoded.email);
  // console.log('SERVICE editRecipeById user', user);
  if (!user) throw Error(missingToken);
  await Models.editRecipeById(id, recipeData);
  return user._id;
};

const deleteRecipeById = async (token, id) => {
  const decoded = Utils.tokenDecrypt(token);
  // console.log('SERVICE deleteRecipeById decoded', decoded);
  const user = await Models.findUser(decoded.email);
  // console.log('SERVICE deleteRecipeById user', user);
  if (!user) throw Error(missingToken);
  await Models.deleteRecipeById(id);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
};