const recipes = require('../services/recipeService');
const { checkRecipesFields } = require('../middleware/checkRecipeFields');
const { badRequest, created } = require('../services/responseType');

const createRecipe = async(req, res) => {
  const {name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  try {
    checkRecipesFields(name, ingredients, preparation);
    const data = await recipes.createRecipe(name, ingredients, preparation, _id);
    return res.status(created).json(data);
  } catch (error) {
    return req.res.status(badRequest).json({ message: error.message });
  }
};

module.exports = {
  createRecipe
};