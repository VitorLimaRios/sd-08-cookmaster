const { ObjectId } = require('mongodb');
const Recipes = require('../models/Recipes');
const recipeValidator = require('../utils/recipeValidator');

const newRecipe = async (recipe, userId) => {
  const recipeValidation = recipeValidator(recipe);
  if (recipeValidation.error) return recipeValidation;
  const { insertedId } = await Recipes.newRecipe({ ...recipe, userId });
  return {
    recipe: {
      ...recipeValidation,
      userId,
      _id: insertedId
    }
  };
};

const getRecipes = async () => {
  const recipes = await Recipes.getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return {
    error: {
      code: 404,
      message: 'recipe not found'
    }
  };

  const recipe = await Recipes.getRecipeById(id);
  return recipe;
};

const update = async (recipeId, recipe, user) => {
  const recipeFromDB = await Recipes.getRecipeById(recipeId);
  if (user.role === 'admin' || recipe.userId === user.id) {
    const updatedRecipe = {
      _id: recipeFromDB._id,
      ...recipe,
      userId: user.id,
    };
  
    await Recipes.update(recipeId, updatedRecipe);
  
    return updatedRecipe;
  }
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipeById,
  update
};