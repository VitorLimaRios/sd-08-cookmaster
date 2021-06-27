const Recipes = require('../models/Recipes');
const recipeValidator = require('../utils/recipeValidator');

const newRecipe = async (recipe, userId) => {
  const recipeValidation = recipeValidator(recipe);
  if (recipeValidation.error) return recipeValidation;
  const { insertedId } = await Recipes.newRecipe(recipe);
  return {
    recipe: {
      ...recipeValidation,
      userId,
      _id: insertedId
    }
  };
};

module.exports = {
  newRecipe,
};