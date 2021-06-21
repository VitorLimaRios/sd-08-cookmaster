const recipes = require('../models/recipes');

const error = require('../helpers/error');
const success = require('../helpers/success');

const TWELVE = 12;
const TWENTYFOUR = 24;
const notFound = 'recipe not found';

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return error('Invalid entries. Try again.');
  const newRecipe = await recipes.createRecipe(name, ingredients, preparation, userId);
  return success({
    recipe: {
      name,
      ingredients,
      preparation,
      _id: newRecipe.insertedId,
      userId,
    },
  });
};

const getRecipes = async () => {
  const result = await recipes.getRecipes();
  return result;
};

const getRecipeById = async (id) => {
  if (!id) return error(notFound);
  if (id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return error(notFound);
  }
  const recipeId = await recipes.getRecipeById(id);
  if (!recipeId) return error(notFound);
  //   const { name, ingredients, preparation } = recipeId;
  return success(recipeId);
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await recipes.updateRecipe(id, name, ingredients, preparation);
  
  return success(updatedRecipe);
};

module.exports = {
  createRecipe,   
  getRecipes,
  getRecipeById,
  updateRecipe,
};