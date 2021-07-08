const Recipes = require('../services/recipes');

const STATUS_OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

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

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipeById = await Recipes.getRecipeById(id);

  if (recipeById.err) {
    return res
      .status(recipeById.err.status)
      .json({ message: recipeById.err.message });
  }

  return res.status(STATUS_OK).json(recipeById);
};

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  const newRecipeInfo = req.body;
  const { user } = req;
  console.log(newRecipeInfo, 'updating');

  const updatedRecipe = await Recipes.updateRecipeById(id, newRecipeInfo, user);

  return res.status(STATUS_OK).json(updatedRecipe);
};

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;
  await Recipes.deleteRecipeById(id);

  return res.status(NO_CONTENT).json();
};

const addRecipeImage = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const recipeImage = `localhost:3000/${path}`;

  const recipeWithImage = await Recipes.addRecipeImage(id, recipeImage);

  return res.status(STATUS_OK).json(recipeWithImage);
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addRecipeImage,
};
