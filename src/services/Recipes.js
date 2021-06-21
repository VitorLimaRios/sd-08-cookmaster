const jwt = require('jsonwebtoken');

const model = require('../models/Recipes');
const { recipeSchema } = require('./validation');

const HTTP = require('../utils/httpStatusCodes');
const generateError = require('../utils/generateError');

const { SECRET } = require('../utils/doNotLook');

const createRecipe = async (recipe, token) => {
  try {
    if (recipeSchema.validate(recipe).error) {
      throw generateError(HTTP.BAD_REQUEST, 'Invalid entries. Try again.');
    }

    const { user } = jwt.verify(token, SECRET);

    return {
      status: HTTP.CREATED,
      result: await model.createRecipe({ ...recipe, userId: user._id }),
    };
  } catch (err) {
    return err;
  }
};

const searchRecipes = async (id) => {
  try {
    return {
      status: HTTP.OK,
      result: id ? await model.getRecipeById(id) : await model.getAllRecipes(),
    };
  } catch (err) {
    if (id) return generateError(HTTP.NOT_FOUND, 'recipe not found');
    return generateError(HTTP.BAD_REQUEST, err.message);
  }
};

const updateRecipe = async (id, newData, token) => {
  try {
    if (recipeSchema.validate(newData).error) {
      throw generateError(HTTP.BAD_REQUEST, 'Invalid entries. Try again.');
    }

    const recipe = await searchRecipes(id);

    if (recipe.status !== HTTP.OK) {
      throw recipe;
    }

    const { user } = jwt.verify(token, SECRET);
    const { userId } = recipe.result;

    if (user.role !== 'admin' && user._id !== userId) {
      throw generateError(HTTP.UNAUTHORIZED, 'not authorized to edit recipe');
    }

    return {
      status: HTTP.OK,
      result: await model.updateRecipe(id, { ...newData, userId }),
    };
  } catch (err) {
    return err;
  }
};

const deleteRecipe = async (id, token) => {
  try {
    const recipe = await searchRecipes(id);

    if (recipe.status !== HTTP.OK) {
      throw recipe;
    }

    const { user } = jwt.verify(token, SECRET);
    const { userId } = recipe.result;

    if (user.role !== 'admin' && user._id !== userId) {
      throw generateError(HTTP.UNAUTHORIZED, 'not authorized to delete recipe');
    }

    await model.deleteRecipe(id);

    return {
      status: HTTP.NO_CONTENT,
      result: null,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

const addImage = async (id, token, imagePath) => {
  try {
    const recipe = await searchRecipes(id);

    if (recipe.status !== HTTP.OK) {
      throw recipe;
    }

    const { user } = jwt.verify(token, SECRET);
    const { userId } = recipe.result;

    if (user.role !== 'admin' && user._id !== userId) {
      throw generateError(HTTP.UNAUTHORIZED, 'not authorized to edit recipe');
    }

    recipe.image = imagePath;

    return {
      status: HTTP.OK,
      result: await model.updateRecipe(id, recipe),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createRecipe,
  searchRecipes,
  updateRecipe,
  deleteRecipe,
  addImage,
};
