const recipesModels = require('../models/recipesModels');

const jwt = require('jsonwebtoken');
const secret = 'trybe-t8';

const createRecipes = async(name, ingredients, preparation, token) =>{
  const { id } = jwt.verify(token, secret);
  const result = await recipesModels.createRecipes(name, ingredients,preparation,id);
  return result;
};

module.exports = {
  createRecipes,
};