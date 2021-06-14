const recipes = require('../models/recipeModel');

async function createRecipe(name, ingredients, preparation, userId){
  const data = await recipes.createRecipe(name, ingredients, preparation, userId);
  return data;
}

module.exports = {
  createRecipe
};