const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeData) => {
  console.log(recipeData);
  const { ops } = await recipesModel.insertOneRecipe(recipeData);
  return { code: 200, response: ops[0] };
};

module.exports = {
  createRecipe,
};
