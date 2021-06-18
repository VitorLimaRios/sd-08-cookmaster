const model = require('../models/recipes');
const INVALID = {
  message: 'Invalid entries. Try again.'
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  (!name || !ingredients || !preparation) && new Error(INVALID);
  
  const newRecipe = await model.createRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return newRecipe;
};

module.exports = {
  createRecipe,
}; 