const recipesModels = require('../models/recipes');
const recipesServices = require('../service/recipes');
const { ObjectId } = require('mongodb');

const STATUS_201 = 201;
const STATUS_204 = 204;
const STATUS_200 = 200;
const STATUS_400 = 400;
const STATUS_404 = 404;

// CREATE
const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user._id;
  if (!name || !ingredients || !preparation) {
    return res.status(STATUS_400 ).json({ message: 'Invalid entries. Try again.' });
  }
  const newRecipe = await recipesModels
    .create({ name, ingredients, preparation, userId });
  res.status(STATUS_201).json({ recipe: newRecipe });
};

// GETALL
const getAll = async (_req, res) => {
  const recipes = await recipesModels.getAll();
  res.status(STATUS_200).send(recipes);
};

// GETBYID
const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModels.getById(id);
  if (!recipe) {
    res.status(STATUS_404).json({ message: 'recipe not found' });
  } else { 
    res.status(STATUS_200).json(recipe);
  }
};

// UPDATEBYID
const updateById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  // console.log('control_update1', userId);
  // console.log('control_update2', id);
  // console.log('control_update3', req.body);
  // console.log('control_update4', req.user);
  // console.log('control_update5', req.user._id);
  const updatedRecipe = req.body;
  const recipe = await recipesModels.updateById(id, updatedRecipe, userId );
  return res.status(STATUS_200).json(recipe);
};

//DELETEBYID
const deleteById = async (req, res) => {  
  const { id } = req.params;
  const recipe = await recipesServices.deleteById(id);
  if (recipe !== null) return res.status(STATUS_204).send(recipe);
  return res.status(STATUS_400).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
};

// ADDIMAGE
const addImage = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const url = `localhost:3000/${path}`;
  const result = await recipesServices.addImage(id, url);
  return res.status(STATUS_200).json(result);
};

// GETIMAGE
const getImage = async (req, res) => {
  const { id } = req.params;
  const result = await recipesServices.getImage(id);
  return res.status(STATUS_200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  addImage,
  getImage,
};
