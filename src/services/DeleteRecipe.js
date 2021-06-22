const ListRecipe = require('../models/ListRecipes');
const deleteRecipe = require('../models/DeleteRecipe');

const DeleteRecipe = async ({ id, user }) => {
  const recipeDetails = await ListRecipe(id);

  if (user.role === 'admin' || user._id === recipeDetails.userId) {
    await deleteRecipe({ id });
  }
};

module.exports = DeleteRecipe;