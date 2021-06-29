const recipesModel = require('../models/recipesModel');
const statusCode = {
  created: 201,
};

const createRecipe = async (recipeData) => {
  console.log(recipeData);
  const { ops } = await recipesModel.insertOneRecipe(recipeData);
  return { code: statusCode.created, response: ops[0] };
};

module.exports = {
  createRecipe,
};
