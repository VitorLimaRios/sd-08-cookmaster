const recipes = require('../Models/recipesModel');


const isValidRecipe = (name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation) => {
  const notValid = isValidRecipe(name, ingredients, preparation);
  if(notValid) {
    throw new Error(notValid);
  }
  return await recipes.create(name, ingredients, preparation);
};

const getAll = async () => { 
  const existingRecipe = await recipes.getAll();
  return existingRecipe;
};

const getById = async (id) => {
  const recipeId = await recipes.getById(id);
  if(recipeId === null) {
    throw new Error('recipe not found');
  }
  // console.log(recipeId);
  return recipeId;
};

const update = async (id, name, ingredients, preparation) => {
  const notValid = isValidRecipe(name, ingredients, preparation);
  if(notValid) {
    throw new Error(notValid);
  }
  const updateRecipes = await recipes.update(id, name, ingredients, preparation);
  return updateRecipes;
};

const exclude = async (id) => {
  const excludeRecipe = await recipes.excludes(id);
  return excludeRecipe;
};

const updateImage = async (id, path) => {
  const updatedRecipeImage = await recipes.image(id, path);
  return updatedRecipeImage;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  exclude,
  updateImage,
};
