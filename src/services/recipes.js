const Joi = require('joi');
const { ObjectId } = require('mongodb');

const recipesModels = require('../models/recipes');
const { Error400, Error401, Error404 } = require('../errors');

const createRecipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  userId: Joi.object(),
});

const add = async (recipe) => {
  const { error } = createRecipeSchema.validate(recipe);
  if (error) {
    throw new Error400('Invalid entries. Try again.');
  }
  const result = await recipesModels.add(recipe);

  return result;
};

const getAll = async () => {
  const result = await recipesModels.getAll();

  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error404('recipe not found');
  }

  const result = await recipesModels.getById(id);

  if (!result) {
    throw new Error404('recipe not found');
  }

  return result;
};

const updateById = async (id, recipe, user) => {
  await recipesModels.updateById(id, recipe);

  const updatedRecipe = {
    _id: id,
    ...recipe,
    userId: user._id,
  };

  return updatedRecipe;
};

const deleteById = async (id) => {
  await recipesModels.deleteById(id);
};

const addImage = async (id, fullPath) => {
  const recipeToAddImage = await recipesModels.getById(id);
  const recipeWithImage = { ...recipeToAddImage, image: fullPath };

  await recipesModels.updateById(id, { image: fullPath });

  return recipeWithImage;
};

const getImage = async (idWithExtension) => {
  const [id] = idWithExtension.split('.');
  const recipe = await recipesModels.getById(id);
  if (!recipe) {
    throw new Error401('recipe not found');
  }

  return recipe.image;
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
  addImage,
  getImage,
};
