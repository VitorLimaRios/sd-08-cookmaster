const jwt = require('jsonwebtoken');

const RecipeSchema = require('../schema/recipe');
const RecipeModel = require('../models/recipes');

const jwtUtil = require('../utils/jwt');


const secret = 'senhasecretamentedificil';

const create = async (token, name, ingredients, preparation) => {
  const decoded = jwt.verify(token, secret, jwtUtil);
  const { _id: userId } = decoded['data'];

  const { error } = RecipeSchema.create.validate({name, ingredients,preparation});
  if(error) {
    error.statusCode = 400;
    error.message = 'Invalid entries. Try again.';
    throw error;
  }
  const recipe = await RecipeModel.create(name, ingredients, preparation, userId);
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipe._id
    }
  };
  
};

const getById = async (id) => {
  try {
    const recipe = await RecipeModel.getById(id);
    if(!recipe) throw error;
    return recipe;
    
  } catch (error) {
    error.message = 'recipe not found';
    error.statusCode = 404;
    throw error;
  }
};

const updateById = async (token, data) => {
  if(!token) {
    const error = new Error('missing auth token');
    error.statusCode = 401;
    throw error;
  }
  const decoded = jwt.verify(token, secret, jwtUtil);
  const { _id: userId, role } = decoded.data;
  const recipe = await RecipeModel.getById(data.id);
  if(!recipe) {
    const error = new Error('Recipe not found');
    error.statusCode = 404;
    throw error;
  }
  if(userId === recipe.userId || role === 'admin') {
    const updatedRecipe = await RecipeModel.updateById(data);
    return updatedRecipe;
  };

  const error = new Error('You are not allowed to update this recipe');
  error.statusCode = 401;
  throw error;
};


module.exports = {
  create,
  getById,
  updateById
};
