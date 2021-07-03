const rescue = require('express-rescue');

const RecipeService = require('../services/recipes');
const RecipeModel = require('../models/recipes');

const STATUS_201 = 201;
const STATUS_200 = 200;

const create = rescue(async (req, res) => {
  const token = req.headers['authorization'];
  const { name, ingredients, preparation } = req.body;
  const recipe = await RecipeService
    .create(token, name, ingredients, preparation);
  res.status(STATUS_201).json(recipe);
});

const getAll = rescue(async (_req, res) => {
  const recipe = await RecipeModel.getAll();
  res.status(STATUS_200).json(recipe);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getById(id);
  res.status(STATUS_200).json(recipe);
});

module.exports = {
  create,
  getAll,
  getById
};
