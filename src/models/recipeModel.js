const { RECIPES } = require('./constants');
const { addNew, getAll, getById, updateById, deleteById } = require('./functions');

const addNewRecipe = async(fields) => await addNew({...fields}, RECIPES);

const getAllRecipes = async() => await getAll(RECIPES);

const getRecipeById = async(id) => await getById(id, RECIPES);

const updateRecipeById = async(infos, id) => await updateById(infos, id, RECIPES);

const deleteRecipeById = async(id) => deleteById(id, RECIPES);

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
