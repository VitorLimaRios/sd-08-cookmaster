const recipesModel = require('../models/recipes');
const BAD_REQUEST = 400;
const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const REQUIRED_LENGTH = 24;

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
        message: 'recipe not found',
      };
    }
    return { status: OK, message: recipe };
  }

  return {
    status: NOT_FOUND,
    message: 'recipe not found',
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
        message: 'recipe not found',
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
    message: 'recipe not found',
  };
};

module.exports = {
  recipeIsValid,
  idIsValid,
  updateRecipeIsValid,
  deleteRecipe,
};
