const { ObjectId } = require('bson');
const { getRecipeById, editRecipe: editRecipeModel,
  deleteRecipe: deleteRecipeModel } = require('../models/recipesModel');

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
const OK = 200;
const NO_CONTENT = 204;

const editRecipe = async (editedRecipe, idRecipe, user) => {
  const recipe = await getRecipeById(idRecipe);
  if(!recipe) return { status: NOT_FOUND, message: 'recipe not found' };
  if(user.role === 'admin' || recipe.userId.equals(ObjectId(user._id))) {
    await editRecipeModel(editedRecipe);
    return { status: OK, ...recipe, ...editedRecipe};
  }
  return { status: UNAUTHORIZED, message: 'User not allowed' };
};

const deleteRecipe = async (idRecipe, user) => {
  const recipe = await getRecipeById(idRecipe);
  if(!recipe) return { status: NOT_FOUND, message: 'recipe not found' };
  if(user.role === 'admin' || recipe.userId.equals(ObjectId(user._id))) {
    await deleteRecipeModel(idRecipe);
    return { status: NO_CONTENT };
  }
  return { status: UNAUTHORIZED, message: 'User not allowed' };
};

module.exports = {
  editRecipe,
  deleteRecipe
};