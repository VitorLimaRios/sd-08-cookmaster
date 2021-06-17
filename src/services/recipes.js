const recipesModel = require('../models/recipes');
const multer = require('multer');
const BAD_REQUEST = 400;
const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const REQUIRED_LENGTH = 24;
const RECIPE_NOT_FOUND = 'recipe not found';

const recipeIsValid = async (name, ingredients, preparation, id) => {
  if (!name || !ingredients || !preparation) {
    return {
      status: BAD_REQUEST,
      message: {
        message: 'Invalid entries. Try again.',
      },
    };
  }

  const newRecipe = await recipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    id
  );

  return { status: CREATED, message: { recipe: newRecipe } };
};

const idIsValid = async (id) => {
  if (id.length === REQUIRED_LENGTH) {
    const recipe = await recipesModel.findRecipe(id);
    if (recipe == null) {
      return {
        status: NOT_FOUND,
        message: RECIPE_NOT_FOUND,
      };
    }
    return { status: OK, message: recipe };
  }

  return {
    status: NOT_FOUND,
    message: RECIPE_NOT_FOUND,
  };
};

const updateRecipeIsValid = async (id, user) => {
  const { _id, role } = user;
  const recipe = await recipesModel.findRecipe(id);
  if (
    JSON.stringify(_id) === JSON.stringify(recipe.userId) ||
    role === 'admin'
  ) {
    return {
      status: OK,
      userId: recipe.userId,
    };
  }
};

const deleteRecipe = async (id, user) => {
  const { _id, role } = user;
  if (id.length === REQUIRED_LENGTH) {
    const recipe = await recipesModel.findRecipe(id);
    if (recipe == null) {
      return {
        status: NOT_FOUND,
        message: RECIPE_NOT_FOUND,
      };
    }
    if (
      JSON.stringify(_id) === JSON.stringify(recipe.userId) ||
      role === 'admin'
    ) {
      await recipesModel.deleteRecipe(id);
      return { status: NO_CONTENT };
    }
  }
  return {
    status: NOT_FOUND,
    message: RECIPE_NOT_FOUND,
  };
};

const uploadImage = async (id, user, image) => {
  const { _id, role } = user;
  const recipe = await recipesModel.findRecipe(id);
  if (
    JSON.stringify(_id) === JSON.stringify(recipe.userId) ||
    role === 'admin'
  ) {
    const uploadedImgRecipe = await recipesModel.uploadImage(id, image);
    if (!uploadedImgRecipe) {
      return { status: 404, message: RECIPE_NOT_FOUND };
    }
    
    return {
      status: 200,
      message: uploadedImgRecipe,
    };
  }
};

module.exports = {
  recipeIsValid,
  idIsValid,
  updateRecipeIsValid,
  deleteRecipe,
  uploadImage
};
