const recipesModel = require('../models/recipes');
const recipesService = require('../services/recipes');
const OK_STATUS = 200;

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const {
    user: { _id },
  } = req;

  const newRecipe = await recipesService.recipeIsValid(
    name,
    ingredients,
    preparation,
    _id
  );

  return res.status(newRecipe.status).json(newRecipe.message);
};

const getRecipes = async (req, res) => {
  const products = await recipesModel.getRecipes();
  return res.status(OK_STATUS).json({products});
};

module.exports = {
  createRecipe,
  getRecipes
};
