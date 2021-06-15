const recipesModel = require('../models/recipes');
const recipesService = require('../services/recipes');

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

module.exports = {
  createRecipe,
};
