const recipesModel = require('../models/recipes');
const BAD_REQUEST = 400;
const CREATED = 201;
const OK = 200;
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
      userId: recipe.userId
    };
  }
};

module.exports = {
  recipeIsValid,
  idIsValid,
  updateRecipeIsValid,
};
