const {
  registerRecipesModel,
  allRecipesModel,
} = require('../../models/recipe/recipe');

const {
  validRecipes,
} = require('../../validations');

const registerRecipes = async (recipes) => {
  const { error } = validRecipes.validate(recipes);
  if (error) return { status: 400, message: error.details[0].message };
  const recipe = await registerRecipesModel(recipes);
  return recipe;
};

const allRecipes = async () => {
  const result = await allRecipesModel();
  return result;
};

module.exports = {
  registerRecipes,
  allRecipes,
};
