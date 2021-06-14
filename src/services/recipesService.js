const recipesModel = require('../models/recipesModel');
const { ObjectId } = require('mongodb');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const createRecipes = async (recipes) => {
  const { name, ingredients, preparation, _id } = recipes;
  if(!name || !ingredients || !preparation)
    return { code: BAD_REQUEST, message: { message: 'Invalid entries. Try again.' } };
  const result = await recipesModel
    .createRecipes({ name, ingredients, preparation, _id });
  return {
    code: CREATED,
    message: {
      recipe: {
        name: result.name,
        ingredients: result.ingredients,
        preparation: result.preparation,
        userId: result.userId,
        _id: result._id,
      }
    }
  };
};

const getRecipes = async () => {
  const result = await recipesModel.getRecipes();
  return { code: OK, message: result };
};

const findRecipes = async (recipeId) => {
  const result = await recipesModel.findRecipes(recipeId);
  if (!result || result.error)
    return { code: NOT_FOUND, message: { message: 'recipe not found' } };
  return { code: OK, message: result };
};

const updateRecipes = async (user, changes, recipeId) => {
  const recipe = await findRecipes(recipeId);
  const { userId } = recipe.message;
  if ((userId.toString() !== user._id.toString()) && user.role === 'user')
    return { code: UNAUTHORIZED, message: { message: 'user not authorized' } };
  const result = await recipesModel.updateRecipes(recipeId, changes);
  return {
    code: OK,
    message: {
      _id: recipeId,
      name: changes.name,
      ingredients: changes.ingredients,
      preparation: changes.preparation,
      userId: userId,
    },
  };
};

module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
};
