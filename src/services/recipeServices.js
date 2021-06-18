const { ObjectId } = require('mongodb');
const { BAD_REQUEST, NOT_FOUND } = require('../api/constants/statusCodes');
const { RECIPE_NOT_FOUND } = require('../api/constants/statusMessages');
const {
  addNewRecipe, getRecipeById, updateRecipeById, deleteRecipeById
} = require('../models/recipeModel');
const { generateError } = require('./errors/generateError');
const recipeValidation = require('./validations/recipeValidation');

const newRecipe = async (name, ingredients, preparation, userId) => {

  const { error } = recipeValidation.validate({
    name, ingredients, preparation
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return generateError(errorMessage, BAD_REQUEST);
  }

  const recipeFields = {name, ingredients, preparation, userId};
  const addRecipe = await addNewRecipe(recipeFields);
  const createdRecipe = addRecipe.ops[0];
  return createdRecipe;
  
};

const recipeById = async (id) => {
 
  if(!ObjectId.isValid(id)) {
    return generateError(RECIPE_NOT_FOUND, NOT_FOUND);
  }

  const recipe = await getRecipeById(id);
  return recipe;
};

const updateRecipe = async(recipeInfos, recipeId) => {
  const { name, ingredients, preparation } = recipeInfos;
  const updatedRecipe = await updateRecipeById(
    {name, ingredients, preparation},
    recipeId
  );

  return updatedRecipe;
};

const deleteRecipe = async(id) => {
  const deletedRecipe = await deleteRecipeById(id);
  return deletedRecipe;
};

module.exports = {
  newRecipe,
  recipeById,
  updateRecipe,
  deleteRecipe,
};
