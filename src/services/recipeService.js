const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');
const { ObjectId } = require('mongodb');
const fs = require('fs/promises');

const ok = 200;
const created = 201;
const error = 400;
const error_token = 401;
const notfound = 404;
const exclude = 204;

const createRecipe = async (recipe) => {
  const { name, ingredients, preparation, _id } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      code: error,
      message: {
        message: 'Invalid entries. Try again.'
      }
    };
  }
  const response = await recipeModel
    .createRecipe({ name, ingredients, preparation, _id });
  return {
    code: created,
    message: {
      recipe: {
        name: response.name,
        ingredients: response.ingredients,
        preparation: response.preparation,
        userId: response.userId,
        _id: response._id,
      }
    }
  };
};

const getRecipe = async () => {
  const response = await recipeModel.getRecipe();
  return { code: ok, message: response };
};

module.exports = {
  createRecipe,
  getRecipe
};
