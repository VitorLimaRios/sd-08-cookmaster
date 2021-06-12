const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const recipeService = require('../services/Recipe');
const { secret } = require('./User');

const CREATED = 201;

const create = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers['authorization'];
  const decoded = jwt.verify(token, secret);
  const createdRecipe = await recipeService.create(decoded.data._id,
    { name, ingredients, preparation });
  res.status(CREATED).json(createdRecipe);
});

const getAll = rescue(async (req, res, next) => {
  const recipes = await recipeService.getAll();
  res.json(recipes);
});

module.exports = {
  create,
  getAll,
};