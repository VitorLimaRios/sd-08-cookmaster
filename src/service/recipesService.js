const recipeModel =  require('../model/recipesModel');
const validations = require('./recipeValidations');

const addRecipe = async (infor, id) => {
  const bodyValid = validations.bodyIsValid(infor);

  if (bodyValid) return bodyValid;

  await recipeModel.addRecipes(infor, id);
  const findRecipesAdd = await recipeModel.findOneRecipes(id);

  return { message: findRecipesAdd, code: 201 };
};

module.exports = {
  addRecipe,
};
