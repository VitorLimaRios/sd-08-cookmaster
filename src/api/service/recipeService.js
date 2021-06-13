const recipes = require('../Models/recipesModel');



const isValidRecipe = (name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const notValid = isValidRecipe(name, ingredients, preparation);
  if(notValid) {
    throw new Error(notValid);
  }
  return await recipes.create(name, ingredients, preparation, userId);
};

const getAll = async () => { 
  const existingProducts = await recipes.getAll();
  return existingProducts;
};

module.exports = {
  createRecipe,
  getAll,
};
