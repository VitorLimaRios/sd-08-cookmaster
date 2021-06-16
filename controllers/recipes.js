const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user._id;
  const result = await recipesService.createRecipe(name, ingredients, preparation, _id);
  res.status(result.code).json(result.message);
};

const getAll = async (req, res) => {
  const recipes = await recipesService.getAll();
  res.status(recipes.code).json(recipes.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  res.status(recipe.code).json(recipe.message);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.deleteRecipe(id);
  res.status(result.code).json(result.message);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const newRecipe = req.body;
  const update = await recipesService.updateRecipe(id, newRecipe);
  res.status(update.code).json(update.message);
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  const update = { ...recipe, image: `localhost:3000/src/uploads/${id}.jpeg` };
  const updateRecipe = await recipesService.updateRecipe(id, update);
  res.json(updateRecipe);
};

const getImage = async (req, res) => {
  const { id } = req.params;
  const image = await recipesService.getImage(id);
  res.status(image.code).sendFile(image.message, { root: __dirname });
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  deleteRecipe,
  updateRecipe,
  uploadImage,
  getImage,
};
