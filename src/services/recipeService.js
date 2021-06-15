const Joi = require('@hapi/joi');

const recipeModel = require('../models/recipeModel');

const validateRecipe = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  userId: Joi.required()
});

const createRecipe = async (recipeData) => {
  const { error } = validateRecipe.validate(recipeData);
  if (error) return { bad_request: true };
 
  const newRecipe = await recipeModel.createRecipe(recipeData);
  return newRecipe;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

module.exports = { createRecipe, getRecipes };