const jwt = require('jsonwebtoken');

const RecipeSchema = require('../schema/recipe');
const RecipeModel = require('../models/recipes');

const { isAllowed } = require('../utils');
const secret = 'senhasecretamentedificil';


const create = async (token, name, ingredients, preparation) => {
  const decoded = jwt.verify(token, secret);
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
  const decoded = jwt.verify(token, secret);
  const { _id: userId, role } = decoded.data;
  const recipe = await RecipeModel.getById(data.id);
  if(!recipe) {
    const error = new Error('Recipe not found');
    error.statusCode = 404;
    throw error;
  }
  const canUpdate = isAllowed(userId, recipe.userId, role);
  if(canUpdate) {
    const updatedRecipe = await RecipeModel.updateById(data);
    return updatedRecipe;
  };

  const error = new Error('You are not allowed to update this recipe');
  error.statusCode = 401;
  throw error;
};


const deleteById = async (token, id) => {
  const decoded = jwt.verify(token, secret);
  const { _id: userId, role } = decoded.data;
  const recipe = await RecipeModel.getById(id);
  if(!recipe) return;
  const canDelete = isAllowed(userId, recipe.userId, role);
  if(canDelete) {
    await RecipeModel.deleteById(id);
    return;
  };
  const error = new Error('You are not allowed to update this recipe');
  error.statusCode = 401;
  throw error;
};

const addImage = async (token, id, fileName) => {
  const imagePath = `localhost:3000/src/uploads/${fileName}`;
  const decoded = jwt.verify(token, secret);
  const { _id: userId, role } = decoded.data;
  const recipe = await RecipeModel.getById(id);
  if(!recipe) {
    const error = new Error('Recipe not found');
    error.statusCode = 404;
    throw error;
  }
  const canUpdate = isAllowed(userId, recipe.userId, role);
  if(canUpdate) {
    const recipe = await RecipeModel.addImage(id, imagePath);
    return recipe;
  }
  const error = new Error('You are not allowed to update this recipe');
  error.statusCode = 401;
  throw error;
};


module.exports = {
  create,
  getById,
  updateById,
  deleteById,
  addImage
};
