const recipesService = require('../services/recipes');

const OK = 200;
const Created = 201;
const NoContent = 204;
const BadRequest = 400;
const Unauthorized = 401;
const NotFound = 404;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, recipeId } = req.body;
    const newRecipe = await recipesService
      .createRecipe(name, ingredients, preparation, recipeId);

    res.status(Created).json(newRecipe);
  } catch (err) {
    res.status(BadRequest).json({
      message: err.message,
    });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();

    res.status(OK).json({ recipes });
  } catch (err) {
    res.status(BadRequest).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) {
      error.err.message = 'Wrong id format';
      return res.status(NotFound).json(error);
    };

    res.status(OK).json(recipe);
  } catch (err) {
    res.status(NotFound).json({ message: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    const recipe = await RecipeService.updateRecipe(id, name, ingredients, preparation);

    res.status(OK).json(recipe);
  } catch (err) {
    res.status(Unauthorized).json({
      message: err.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    await RecipeService.deleteRecipe(id);

    res.status(NoContent).end();
  } catch (err) {
    res.status(BadRequest).json({
      message: err.message,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
