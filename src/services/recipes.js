const recipes = require('../models/recipes');

const error = require('../helpers/error');
const success = require('../helpers/success');


const createRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return error('Invalid entries. Try again.');
  const newRecipe = await recipes.createRecipe(name, ingredients, preparation);
  return success({
    recipe: {
      name,
      ingredients,
      preparation,
      _id: newRecipe.insertedId,
    },
  });
};

module.exports = {
  createRecipe,   
};