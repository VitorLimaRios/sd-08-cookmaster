const recipesModel = require('../models/recipesModels');
const userModel = require('../models/usersModels');
const { ObjectId } = require('mongodb');

async function createRecipes(recipes) {
  const { name, ingredients, preparation  } = recipes;

  if(!name || !ingredients || !preparation ) {
    return {code: 400, message :{message: 'Invalid entries. Try again.'}};
  }

  const recipe = await recipesModel.createRecipes(recipes);

  return {code: 201, message: { recipe }};
};

async function getAllRecipes() {

  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

async function getRecipeById(id) {

  if(!ObjectId.isValid(id)) {
    return {code: 404, message: {message: 'recipe not found'}};
  }

  const recipe = await recipesModel.getRecipeById(id);
  return {code: 200, message: recipe };
};

async function updateRecipe(id, recipe,  user) {
  const { email } = user;

  const userConsult = await userModel.findByEmail(email);
  const emailConsult = userConsult.email;
  const emailRequest = user.email;

  if( emailConsult === emailRequest ) {
    console.log('pode editar');
    await recipesModel.updateRecipe(id, recipe);
    const recipeUpdated = await recipesModel.getRecipeById(id);
    return {code: 200, message: recipeUpdated };
  }
}

async function deleteRecipe(id) {
  const result = await recipesModel.deleteRecipe(id);
  // console.log(result);
  return {code: 204, message: undefined};
}

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
