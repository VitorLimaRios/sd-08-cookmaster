const recipeService = require('../services/recipeService');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const CREATED = 201;
const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const addRecipe = async (req, res) => {
  const userId = req.user._id;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await recipeService.add(
    name,
    ingredients,
    preparation,
    userId
  );

  if (newRecipe === undefined) {
    res.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (newRecipe !== undefined) {
    return res.status(CREATED).json({ recipe: newRecipe });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAll();
    res.status(OK).json(recipes);
  } catch (err) {
    console.error(err);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
};
