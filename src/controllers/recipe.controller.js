const { 
  createRecipe, 
  getRecipeById, 
  updateRecipe,
  excludeRecipe 
} = require('../services/recipeFunctions.service');
const { getAll } = require('../models/recipe.model');
const { StatusCodes: { 
  CREATED, BAD_REQUEST, OK, NOT_FOUND, NO_CONTENT
} } = require('http-status-codes');

exports.register = async (req, res) => {
  const form = req.body;
  try {
    const recipe = await createRecipe({...form, userId: req.user._id});
    res.status(CREATED).json(recipe);
  } catch (err) {
    res.status(BAD_REQUEST).json({message: err.message});
  }
};

exports.findAll = async (_req, res) => {
  try {
    const recipe = await getAll();
    res.status(OK).json(recipe);
  } catch (err) {
    res.status(BAD_REQUEST).json({message: err.message});
  }
};

exports.findById = async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    res.status(OK).json(recipe);
  } catch (err) {
    res.status(NOT_FOUND).json({message: err.message});
  }
};

exports.change = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  try {
    const recipe = await updateRecipe(id, { name, ingredients, preparation });
    res.status(OK).json(recipe);
  } catch (err) {
    res.status(NOT_FOUND).json({message: err.message});
  }
};

exports.exclude = async (req, res) => {
  const { id } = req.params;
  try {
    await excludeRecipe(id);
    res.status(NO_CONTENT).json();
  } catch (err) {
    res.status(NOT_FOUND).json({message: err.message});
  }
};

exports.uploadOne = async (req, res) => {
  const { id } = req.params;
  const image = `${req.headers.host}/src/uploads/${req.params.id}.jpeg`;
  try {
    const recipe = await updateRecipe(id, { image });
    res.status(OK).json(recipe);
  } catch (err) {
    res.status(NOT_FOUND).json({message: err.message});
  }
};