const RecipeService = require('../services/recipeService');

const CREATED = 201;
const OK = 200;

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

const getAll = async (_req, res) => {
  const allRecipes = await RecipeService.getAll();

  res.status(OK).json(allRecipes);
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeService.findById(id);
    
    res.status(OK).json(recipe);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

module.exports = {
  create,
  getAll,
  findById,
};
