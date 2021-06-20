const Model = require('../models/RecipeModel');

const Joi = require('joi');

const { ObjectId } = require('mongodb');

const create = async ({name, ingredients, preparation, userId}) => {
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

  return Model.create(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => {
  return Model.getAll();
};


const getById = async (id) => {

  if(!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: 'recipe not found',
      status: 404
    }));
  }

  const result = await Model.getById(id);
  if(!result) {
    throw new Error(JSON.stringify({
      message: 'recipe not found',
      status: 404
    }));
  }

  return result;
};

const updateById = async (id, name, ingredients, preparation) => {
  if(!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify({
      message: 'recipe not found',
      status: 404
    }));
  }

  return Model.updateById(id, name, ingredients, preparation);
};

module.exports = {
  create,
  getAllRecipes,
  getById,
  updateById
};
