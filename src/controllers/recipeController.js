const recipes = require('../services/recipeService');
const { checkRecipesFields } = require('../middleware/checkRecipeFields');
const { 
  badRequest, 
  created, 
  success, 
  internalServerError,
  notFound,
  noContent} = require('../services/responseType');

const createRecipe = async(req, res) => {
  const {name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  try {
    checkRecipesFields(name, ingredients, preparation);
    const data = await recipes.createRecipe(name, ingredients, preparation, _id);
    return res.status(created).json(data);
  } catch (error) {
    return req.res.status(badRequest).json({ message: error.message });
  }
};

const getAllRecipes = async(_req, res) => {
  try {
    const data = await recipes.getAllRecipes();
    return res.status(success).json(data);
  } catch (error) {
    return res.status(internalServerError).json({message: error.message});
  }
};

const getRecipeById = async(req, res) => {
  const { id } = req.params;
  try {
    const data = await recipes.getRecipeById(id);
    res.status(success).json(data);
  } catch (error) {
    res.status(notFound).json({message: error.message});
  }
};

const editRecipe = async(req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  try {
    const data = await recipes.editRecipe(name, ingredients, preparation, id);
    return res.status(success).json(data);
  } catch (error) {
    return res.status(internalServerError).json({message: error.message});
  }
};

const deleteRecipe = async(req, res) => {
  const { id } = req.params;
  try {
    const data = await recipes.deleteRecipe(id);
    return res.status(noContent).json(data);
  } catch (error) {
    return res.status(internalServerError).json({message: error.message});
  }
};
module.exports = {
  createRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe
};