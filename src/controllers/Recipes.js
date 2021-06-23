const rescue = require('express-rescue');
const service = require('../services/Recipes');
const recipeSchema = require('../schemas/RecipeSchema');

const CREATED = 201;
const OK = 200;

const create = rescue(async (req, res, next) => {

  const { error } = recipeSchema.validate(req.body);

  if (error) return next(error);

  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.user;

  const recipe = await service.create({ name, ingredients, preparation }, userId);

  if (recipe.error) return next(recipe.error);

  res.status(CREATED).json(recipe);
});


const get = rescue(async (_, res) => {
  const recipes = await service.get();

  res.status(OK).json(recipes);
});


const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await service.getById(id);

  if (recipe.error) return next(recipe.error);

  res.status(OK).json(recipe);
});

module.exports = {
  create,
  get,
  getById
};