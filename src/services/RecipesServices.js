const RecipesModel = require('../models/RecipesModel');
const RecipesSchemas = require('../schemas/RecipesSchemas');


const insertRecipe = async (name, ingredients, preparation, _id) => {

  const validation = RecipesSchemas.inputValidation(name, ingredients, preparation);

  if(validation.code) return validation;
  
  const response = RecipesSchemas.NewObjectRecipe({name, ingredients, preparation, _id});
  const RecipeBank = await RecipesModel.insertRecipe(response);
  const NewObject = RecipesSchemas.AddNewKeyRecipe(RecipeBank);
    
  return NewObject;
};

const getRecipes = async () => {
  const response = await RecipesModel.getRecipes();

  return response;
};

const getRecipeID = async (id) => {
  const response = await RecipesModel.getRecipeID(id);

  const validate = RecipesSchemas.recipeExists(response);

  if(validate.code) return validate;

  return response[0];
};

const editRecipe = async (ObjectValues) => {

  const response = await RecipesSchemas
    .verifiUserAndRecipe(ObjectValues);

  if(response.code) return response;

  const recipeEdit = await RecipesModel.editRecipe(ObjectValues);
  
  return recipeEdit;
};

const deleteRecipe = async (idUserLogin, idRecipe, typeUser) => {
  const response = await RecipesSchemas
    .verifiUserAndRecipe(idUserLogin, idRecipe, typeUser);
  if(response.code) return response;

  const recipeDelete = await RecipesModel.deleteRecipeBank(idRecipe);

  if(recipeDelete === 1) return true;
  return false;
};

module.exports = {
  insertRecipe,
  getRecipes,
  getRecipeID,
  editRecipe,
  deleteRecipe
};
