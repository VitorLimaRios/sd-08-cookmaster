const Model = require('../models/RecipeModel');

const Joi = require('joi');

const create = async ({name, ingredients, preparation}) => {
  const schema = Joi.object({
    recipeName: Joi.string()
      .required(),
    recipeIngredient: Joi.string()
      .required(),
    recipePreparation: Joi.string()
      .required()
  });

  const validations = schema
    .validate({
      recipeName: name, recipeIngredient: ingredients, recipePreparation: preparation
    });
    
  if(validations.error) {
    throw new Error(JSON.stringify({
      message: 'Invalid entries. Try again.',
      status: 400
    }));
  }

  return Model.create(name, ingredients, preparation);
};

module.exports = {
  create
};
