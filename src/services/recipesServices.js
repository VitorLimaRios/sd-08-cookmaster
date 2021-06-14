const recipesModels = require('../models/recipesModels');

const getAll = async () => {
  const recipes = await recipesModels.getAllRecipes();
  return recipes;
};

module.exports = {
  getAll,
};
