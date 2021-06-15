const { createRecipe, getRecipeById } = require('../services/recipeFunctions.service');
const { getAll } = require('../models/recipe.model');
const { StatusCodes: { 
  CREATED, BAD_REQUEST, OK, NOT_FOUND
} } = require('http-status-codes');
const { getById } = require('../models/user.model');

exports.register = async (req, res) => {
  const form = req.body;
  try {
    const recipe = await createRecipe(form);
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