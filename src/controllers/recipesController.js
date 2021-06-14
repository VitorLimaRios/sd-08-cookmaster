const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const CREATED_STATUS = 201;
const OK_STATUS = 200;
const NO_CONTENT_STATUS = 204;

const registerRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const result = await recipeService.registerRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  if (result.err) return next(result);
  res.status(CREATED_STATUS).json(result);
});

const getAllRecipes = rescue(async (req, res, next) => {
  const result = await recipeService.getAllRecipes();
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const getRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await recipeService.getRecipeById(id);
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const updateRecipeById = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const email = req.email;
  const role = req.role;
  const result = await recipeService.updateRecipeById(
    id,
    { name, ingredients, preparation },
    role,
    email
  );
  if (result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

const deleteRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await recipeService.deleteRecipeById(id);
  if (result.err) return next(result);
  res.status(NO_CONTENT_STATUS).send();
});

const addImageToRecipe = rescue(async (req, res, next) => {
  const {id} = req.params;
  const path = `localhost:3000/src/uploads/${id}.jpeg`;
  const result = await recipeService.addImageToRecipe(id, path);
  if(result.err) return next(result);
  return res.status(OK_STATUS).json(result);
});

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addImageToRecipe
};
