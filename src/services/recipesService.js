const recipesModel = require('../models/recipesModel');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;

const createRecipes = async (recipes) => {
  const { name, ingredients, preparation, _id } = recipes;
  if(!name || !ingredients || !preparation)
    return { code: BAD_REQUEST, message: { message: 'Invalid entries. Try again.' } };
  const result = await recipesModel
    .createRecipes({ name, ingredients, preparation, _id });
  return {
    code: CREATED,
    message: {
      recipe: {
        name: result.name,
        ingredients: result.ingredients,
        preparation: result.preparation,
        userId: result.userId,
        _id: result._id,
      }
    }
  };
};

const getRecipes = async () => {
  const result = await recipesModel.getRecipes();
  return { code: OK, message: result };
};

module.exports = {
  createRecipes,
  getRecipes,
};
