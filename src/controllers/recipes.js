const rescue = require('express-rescue');

const RecipeService = require('../services/recipes');
const RecipeModel = require('../models/recipes');

const STATUS_201 = 201;
const STATUS_200 = 200;
const STATUS_204 = 204;

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

const updateById = rescue(async (req, res) => {
  const token = req.headers['authorization'];
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const data = {
    id,
    name,
    ingredients,
    preparation
  };
  const recipe = await RecipeService.updateById(token, data);
  res.status(STATUS_200).json(recipe);
});

const deleteById = rescue(async (req, res) => {
  const token = req.headers['authorization'];
  const { id } = req.params;
  await RecipeService.deleteById(token, id);
  res.status(STATUS_204).json({});
});

const addImage = rescue(async (req, res) => {
  const { id } = req.params;
  const token = req.headers['authorization'];
  const fileName = req.fileName;
  const recipe = await RecipeService.addImage(token, id, fileName);
  res.status(STATUS_200).json(recipe);
});

const recipeImages = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.recipeImage(id);
  res.status(STATUS_200).json(recipe);
});




module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  addImage,
  recipeImages
};
