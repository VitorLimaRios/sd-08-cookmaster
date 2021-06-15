const recipesModel = require('../models/recipes');
const BAD_REQUEST = 400;
const CREATED = 201;
const CONFLICT = 409;

const recipeIsValid = async (name, ingredients, preparation, id) => {
  if (!name || !ingredients || !preparation) {
    return ({
      status: BAD_REQUEST,
      message: {
        message: 'Invalid entries. Try again.',
      }
    });
  }

  const newRecipe = await recipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    id
  );


  return { status: CREATED, message: { recipe: newRecipe} };
};

module.exports = {
  recipeIsValid,
};
