const recipesModels = require('../models/recipesModels');

const jwt = require('jsonwebtoken');
const secret = 'trybe-t8';

const createRecipes = async(name, ingredients, preparation, userId) =>{
  // const { id } = jwt.verify(token, secret);
  const result = await recipesModels.createRecipes(name, ingredients,preparation, userId);
  return result;
};

module.exports = {
  createRecipes,
};