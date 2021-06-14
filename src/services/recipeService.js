const recipes = require('../models/recipeModel');

async function createRecipe(name, ingredients, preparation, userId){
  const data = await recipes.createRecipe(name, ingredients, preparation, userId);
  return data;
}

async function getAllRecipes(){
  const data = await recipes.getAllRecipes();
  return data;
}

async function getRecipeById(id){
  const data = await recipes.getRecipeById(id);
  if(!data) throw new Error('recipe not found');
  return data;
}

async function editRecipe(name, ingredients, preparation, id){
  const data = await recipes.editRecipe(name, ingredients, preparation, id);
  return data;
}

module.exports = {
  createRecipe, getAllRecipes, getRecipeById, editRecipe
};