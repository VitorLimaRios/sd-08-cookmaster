const { RECIPES } = require('./constants');
const { addNew, getAll } = require('./functions');

const addNewRecipe = async(fields) => await addNew({...fields}, RECIPES);

const getAllRecipes = async() => await getAll(RECIPES);

module.exports = {
  addNewRecipe,
  getAllRecipes,
};
