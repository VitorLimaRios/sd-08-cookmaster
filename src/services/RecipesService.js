const RecipesModel = require('../models/RecipesModel');

const create = async (userId, recipe) => {
  const { name, ingredients, preparation } = recipe;
  if(!name || !ingredients || !preparation) return {
    error: {
      code: 400,
      message: 'Invalid entries. Try again.'
    }
  };

  const newRecipe = await RecipesModel.create(userId, recipe);
  return newRecipe;
};

module.exports = {
  create,
};
