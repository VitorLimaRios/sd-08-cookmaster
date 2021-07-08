const Recipes = require('../models/recipes');
const recipeSchema = require('../schema/recipes');

const addRecipe = async (recipeInfo) => {
  console.log(recipeInfo);
  const { error } = recipeSchema.validate(recipeInfo);
  if (error) return {
    err: {
      message: 'Invalid entries. Try again.',
      status: 400,
    }
  };

  const newRecipe = await Recipes.addRecipe(recipeInfo);
  return newRecipe;
};

module.exports = {
  addRecipe,
};
