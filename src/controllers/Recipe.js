const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const recipeService = require('../services/Recipe');
const { secret } = require('./User');

const CREATED = 201;
const NO_CONTENT = 204;

const create = rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers['authorization'];
  const decoded = jwt.verify(token, secret);
  const createdRecipe = await recipeService.create(decoded.data._id,
    { name, ingredients, preparation });
  res.status(CREATED).json(createdRecipe);
});

const getAll = rescue(async (_req, res, _next) => {
  const recipes = await recipeService.getAll();
  res.json(recipes);
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const recipe = await recipeService.getById(id);
  if (!recipe) throw boom.notFound('recipe not found');
  res.json(recipe);
});

const edit = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const editedRecipe = await recipeService.edit(id, { name, ingredients, preparation });
  res.json(editedRecipe);
});

const remove = rescue(async (req, res, _next) => {
  const { id } = req.params;
  await recipeService.remove(id);
  res.status(NO_CONTENT).send();
});

module.exports = {
  create,
  getAll,
  getById,
  edit,
  remove,
};