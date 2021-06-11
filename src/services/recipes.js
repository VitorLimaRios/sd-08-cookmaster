const recipesModel = require('../models/recipes');
const validations = require('./validations');
const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

const readRecipes = () => recipesModel.readRecipes();

const createRecipe = (token, recipe) => {
  console.log(recipe , 'createRecipes');
  validations.recipeBodyRequest(recipe);
};

module.exports = {
  readRecipes,
  createRecipe,
};