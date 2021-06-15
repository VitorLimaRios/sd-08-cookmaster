const recipesModel = require('../models/recipesModel');

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllTheRecipes();
  return allRecipes;
}

module.exports = { getAllRecipes };
