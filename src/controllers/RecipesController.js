const RecipesServices = require('../services/RecipesServices');

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQ = 400;

const addNewRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;

    const recipeToAdd = await RecipesServices
      .addNewRecipe(name, ingredients, preparation, userId);

    res
      .status(CREATED)
      .json(recipeToAdd);

  } catch (err) {
    res
      .status(BAD_REQ)
      .json({
        message: err.message,
      });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipesToList = await RecipesServices
      .getAllRecipes();

    res
      .status(SUCCESS)
      .json(recipesToList);

  } catch (err) {
    res
      .status(BAD_REQ)
      .json({ message: err.message });
  }
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
};