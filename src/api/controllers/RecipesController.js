const Recipes = require('../services/Recipes');

const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;
const CREATED = 201;
const OK = 200;

const newRecipe = async (req, res) => {
  const recipeFromBody = req.body;
  const { id } = req.user;
  const recipe = await Recipes.newRecipe(recipeFromBody, id);
  
  try {
    if (recipe.error) return res.status(recipe.error.code)
      .json({ message: recipe.error.message});

    return res.status(CREATED).json(recipe);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Error', error });
  }
};

const getRecipes = async (_req, res) => {
  const recipes = await Recipes.getRecipes();
  return res.status(OK).json(recipes);

};

module.exports = {
  newRecipe,
  getRecipes
};