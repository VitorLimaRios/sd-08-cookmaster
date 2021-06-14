const recipesModel = require('../models/recipesModel');

const CREATED = 201;
const BAD_REQUEST = 400;

const createRecipes = async (recipes) => {
  console.log(recipes);
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

module.exports = {
  createRecipes,
};
