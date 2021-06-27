const Recipes = require('../services/Recipes');

const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;

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

module.exports = {
  newRecipe,
};