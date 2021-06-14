const rescue = require('express-rescue');
const Recipe = require('../../services/recipes/Recipes');
const { ERRORS, STATUS_201, STATUS_200 } = require('../../utils/consts');
const JWTValidation = require('../../utils/JWTValidation');

const create = rescue(async (req, res) => {
  const { eToken } = ERRORS;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(eToken.status).json({ message: eToken.message });
  const data = JWTValidation(token);
  if (!data._id) return res.status(eToken.status).json({ message: eToken.message });
  const userId = data._id;
  const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return res.status(STATUS_201).json({ recipe: newRecipe });
});

const getAll = rescue(async (_req, res) => {
  const recipesList = await Recipe.getAll();
  return res.status(STATUS_200).json(recipesList);
});

const getRecipeById = rescue(async (req, res) => {
  const { eNotFound } = ERRORS;
  const { id } = req.params;
  
  const recipe = await Recipe.getRecipeById(id);

  if (!recipe._id) {
    return res.status(eNotFound.status).json({ message: eNotFound.message });
  }
  return res.status(STATUS_200).json(recipe);
});

module.exports = {
  create,
  getAll,
  getRecipeById,
};