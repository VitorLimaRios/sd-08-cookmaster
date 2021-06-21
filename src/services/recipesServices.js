const recipesModel = require('../models/recipesModel');

const addRecipes = async (dataRecipes, dataUsers) => {
  const { name, ingredients, preparation } = dataRecipes;
  const insertRecipes = await recipesModel
    .addRecipes(name, ingredients, preparation, dataUsers._id);

  return {
    name: insertRecipes.name,
    ingredients: insertRecipes.ingredients,
    preparation: insertRecipes.preparation,
    userid: dataUsers._id,
    _id: insertRecipes._id,
  };

};

const getAllRecipes = async () => {
  const getAll = await recipesModel.getAllRecipes();
  return getAll;
};

module.exports = {
  addRecipes,
  getAllRecipes,
};
