const recipesModel = require('../models/recipes');
const validations = require('./validations');


const readRecipes = () => recipesModel.readRecipes();

const createRecipe = async(recipe) => {
  validations.recipeBodyRequest(recipe);

};

module.exports = {
  readRecipes,
  createRecipe,
};