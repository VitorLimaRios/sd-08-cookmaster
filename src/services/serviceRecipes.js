const recipesModel = require('../models/recipesModels');
const { ObjectId } = require('mongodb');
const { validateEmail } = require('../middlewares/userMiddleware');

async function createRecipes(recipes) {

  const { name, ingredients, preparation  } = recipes;

  if(!name || !ingredients || !preparation ) {
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  }

  const recipe = await recipesModel.createRecipes(recipes);

  return {code: 201, message: { recipe }};

}

async function getAllRecipes() {

  const recipes = await recipesModel.getAllRecipes();
  return recipes;
}

async function getRecipeById(id) {

  if(!ObjectId.isValid(id)) {
    return {code: 404, message: {message: 'recipe not found'}};
  }

  const recipe = await recipesModel.getRecipeById(id);
  console.log(recipe);
  return {code: 200, message: recipe };
}

module.exports = { createRecipes, getAllRecipes, getRecipeById };
