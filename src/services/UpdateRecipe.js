const ListRecipe = require('../models/ListRecipes');
const updateRecipe = require('../models/UpdateRecipe');

const UpdateRecipe = async ({id, user, name, ingredients, preparation}) => {
  const recipeDetails = await ListRecipe(id);

  if (user.role === 'admin' || user._id === recipeDetails.userId) {
    await updateRecipe({
      id,
      name,
      ingredients,
      preparation,
    });

    return { ...recipeDetails, name, ingredients, preparation };
  }
};

module.exports = UpdateRecipe;