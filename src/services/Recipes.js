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
  console.log(user);
  const recipeFromDB = await Recipes.getRecipeById(recipeId);
  if (user.role !== 'admin' && recipeFromDB.userId !== user.id) {
    console.log('Deu ruim');
    return {
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    };
  };
  const updatedRecipe = {
    _id: recipeFromDB._id,
    ...recipe,
    userId: user.id,
  };

  await Recipes.update(recipeId, updatedRecipe);
  return updatedRecipe;
};

const remove = async (id, user) => {
  const recipe = await Recipes.getRecipeById(id);
  if (!recipe || !ObjectId.isValid(id)) return {
    error: {
      code: 404,
      message: 'Recipe not found'
    }
  };

  if (user.role === 'admin' || recipe.userId === user.id) {
    await Recipes.remove(id);
  }
};

const image = async (id, image, user) => {
  const recipe = await Recipes.getRecipeById(id);
  if (!recipe || !ObjectId.isValid(id)) return {
    error: {
      code: 404,
      message: 'Recipe not found'
    }
  };
  if (user.role === 'admin' || recipe.userId === user.id) {
    const recipeWithImage = {
      ...recipe,
      image: `localhost:3000/${image.path}`
    };
    await Recipes.update(id, recipeWithImage);
    return recipeWithImage;
  }
};

const getImage = async (id) => {
  const recipeId = id.split('.');
  const recipe = await Recipes.getRecipeById(recipeId[0]);
  return recipe.image;
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipeById,
  update,
  remove,
  image,
  getImage
};