const Recipes = require('../services/recipes');

const STATUS_OK = 200;
const CREATED = 201;

const addRecipe = async (req, res) => {
  const recipeInfo = req.body;
  const { _id: userId } = req.user;
  const recipe = { ...recipeInfo, userId };

  const newRecipe = await Recipes.addRecipe(recipe);

  if (newRecipe.err) {
    return res
      .status(newRecipe.err.status)
      .json({ message: newRecipe.err.message });
  }

  return res.status(CREATED).json({ recipe: newRecipe });
};

const getAllRecipes = async (_req, res) => {
  const recipesList = await Recipes.getAllRecipes();
  return res.status(STATUS_OK).json(recipesList);
};

module.exports = {
  addRecipe,
  getAllRecipes,
};
