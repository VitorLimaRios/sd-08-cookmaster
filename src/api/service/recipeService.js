const recipes = require('../Models/recipesModel');

const validateRecipe = (name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation) => {
  const invalid = validateRecipe(name, ingredients, preparation);
  if(invalid) {
    throw new Error(invalid);
  }
  return await recipes.create(name, ingredients, preparation);
};

const getAll = async () => {
  const allRecipes = await recipes.getAll();
  return allRecipes;
};

const getById = async (id) => {
  const recipeId = await recipes.getById(id);
  if(!recipeId) throw new Error('recipe not found');
  return recipeId;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const invalid = validateRecipe(name, ingredients, preparation);
  if(invalid) {
    throw new Error(invalid);
  };
  const updateRec = await recipes.updateRecipe(id, name, ingredients, preparation);
  return updateRec;
};

const deleteRecipe = async (id) => {
  const deleteRec = await recipes.deleteRecipe(id);
  return deleteRec;
};

const sendImage = async (id, path) => {
  const recipeImage = await recipes.sendImage(id, path);
  return recipeImage;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  deleteRecipe,
  updateRecipe,
  sendImage,
};
