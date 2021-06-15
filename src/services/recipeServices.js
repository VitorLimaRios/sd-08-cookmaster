const { BAD_REQUEST } = require('../api/constants/statusCodes');
const { addNewRecipe } = require('../models/recipeModel');
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

module.exports = {
  newRecipe,
};
