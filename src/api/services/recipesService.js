const recipesModel = require('../models/recipesModel');
const recipesSchema = require('../schema/recipesSchema');
const { created, unauthorized, ok } = require('../helpers/statusCode');

const createRecipe = async (recipeData, token) => {
  console.log(recipeData);
  const validateBody = recipesSchema.validateRecipeCreation(recipeData);
  if (validateBody) return validateBody;

  const payload = recipesSchema.validateToken(token);
  if (payload.code === unauthorized) return payload;

  const { ops } = await recipesModel.insertOneRecipe(
    { ...recipeData, userId: payload['_id'] },
  );
  return { code: created, response: { recipe: ops[0] } };
};

const getAllRecipes = async () => {
  const recipesList = await recipesModel.getAllRecipes();
  return { code: ok, response: recipesList };
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
