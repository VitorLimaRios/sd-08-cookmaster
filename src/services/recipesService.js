const Joi = require('joi');
const model = require('../models/recipesModel');
const ZERO = 0;

const recipesValidation = (data) => {
  return Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(data);
};

const addRecipesServices = async ({ name, ingredients, preparation }, { _id: id }) => {
  const { error } = recipesValidation({ name, ingredients, preparation });

  if (error) return {
    statusCode: 400,
    json: {
      message: 'Invalid entries. Try again.'
    },
  };

  const response = await model.addRecipe({ name, ingredients, preparation, id });

  return {
    statusCode: 201,
    json: {
      recipe: {
        name: response.name,
        ingredients: response.ingredients,
        preparation: response.preparation,
        userId: response.userId,
        _id: response._id
      },
    },
  };
};

const getAllRecipesService = async () => {
  const response = await model.getAllRecipes();

  if (response.length === ZERO) return {
    statusCode: 404,
    json: {
      message: 'Nenhuma receita cadastrada ainda!',
    },
  };

  return {
    statusCode: 200,
    json: response
  };
};

const getRecipeIdServices = async (id) => {
  const response = await model.getRecipeId(id);

  if (!response) return {
    statusCode: 404,
    json: {
      message: 'recipe not found'
    },
  };

  return {
    statusCode: 200,
    json: response[0]
  };
};

module.exports = {
  addRecipesServices,
  getAllRecipesService,
  getRecipeIdServices
};
