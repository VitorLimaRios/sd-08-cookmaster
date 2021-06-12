const rescue = require('express-rescue');
const RecipesService = require('../services/RecipesService');
const { validateJWT } = require('../services/validations');

const OK_STATUS = 200;
const CREATED = 201;
const UNAUTHORIZED = 401;

const createRecipe = rescue(async (req, res) => {
  const token = req.headers.authorization;
  if(!token) return res
    .status(UNAUTHORIZED).json({ message: 'jwt malformed'});
  const verifiedToken = await validateJWT(token);
  if(verifiedToken.error) return res
    .status(verifiedToken.error.code).json({ message: verifiedToken.error.message});
  const id = verifiedToken.id;
  const recipe = req.body;
  const newRecipe = await RecipesService.create(id, recipe);
  if(newRecipe.error) return res
    .status(newRecipe.error.code).json({ message: newRecipe.error.message});
  return res.status(CREATED).json({ recipe: newRecipe });
});


const getAllRecipes = rescue(async (req, res) => {
  const recipes = await RecipesService.getAll();
  return res.status(OK_STATUS).json(recipes);
});


const getRecipeById = rescue(async (req, res ) => {
  const { id } = req.params;
  const recipe = await RecipesService.findById(id);
  if(recipe.error) return res
    .status(recipe.error.code).json({ message: recipe.error.message });
  return res.status(OK_STATUS).json(recipe);
});


module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
