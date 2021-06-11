const RecipeService = require('../services/recipeService');

const CREATED = 201;

const create = async (req, res) => {
  try {
    const newRecipe = req.body;
    const { user } = req;

    const createdRecipe = await RecipeService.create(newRecipe, user._id);

    res.status(CREATED).json(createdRecipe);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

module.exports = {
  create,
};
