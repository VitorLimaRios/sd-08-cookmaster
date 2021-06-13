const usersController = require('../controllers/user');
const recipe = require('../models/recipe');
//const axios =require('axios');
//const fs = require('fs');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const post = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipeObject = await recipe.create(name, ingredients, preparation, req.userId);
  res.status(CREATED).json({ 'recipe': recipeObject.ops[0] });
};

const getAll = async (_req, res) => {
  res.status(OK).json(await recipe.getAll());
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeObject = await recipe.getOne(id);
    if (!recipeObject) res.status(NOT_FOUND).json({ 'message': 'recipe not found' });
    res.status(OK).json(recipeObject);
  } catch {
    res.status(NOT_FOUND).json({ 'message': 'recipe not found' });
  }
};

const update = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { role, userId } = req;

  try {
    const currentRecipe = await recipe.getOne(id);
    if (String(userId) != String(currentRecipe.userId) && role != 'admin')
      throw new Error;
    const updatedRecipe = await recipe.update(id, name, ingredients, preparation);
    res.status(OK).json(updatedRecipe);
  } catch (err) {
    res.status(UNAUTHORIZED).json({ 'message': 'deu ruim' });
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { role, userId } = req;

  try {
    const currentRecipe = await recipe.getOne(id);
    console.log(currentRecipe);
    if (String(userId) != String(currentRecipe.userId) && role != 'admin')
      throw new Error;
    await recipe.exclude(id);
    res.status(NO_CONTENT).send(null);
  } catch (err) {
    res.status(UNAUTHORIZED).json({ 'message': 'deu ruim' });
  }
};

const upload = async (req, res) => {
  const { id } = req.params;

  try {
    const { filename } = req.file;
    const imagePath = `localhost:3000/src/uploads/${filename}`;
    const updatedRecipe = await recipe.updateImage(id, imagePath);
    res.status(OK).json(updatedRecipe);
  } catch (err) {
    res.status(UNAUTHORIZED).json({ 'message': 'deu ruim' });
  }
  
};

module.exports = {
  post,
  update,
  exclude,
  getAll,
  getOne,
  upload,
};
