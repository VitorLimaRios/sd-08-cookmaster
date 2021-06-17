const jwt = require('jsonwebtoken');
const RecipesModel = require('../models/RecipesModel');

const secret = 'trybe123';
const CREATED = 201;

const createRecipe = async (name, ingredients, preparation, token) => {
  const { id } = jwt.verify(token, secret);
  await RecipesModel.createRecipe(name, ingredients, preparation, id);
  const newRecipe = await RecipesModel.getRecipeByName(name);
  return { CREATED, message: { recipe: newRecipe }
  };
};

module.exports = {
  createRecipe,
};
