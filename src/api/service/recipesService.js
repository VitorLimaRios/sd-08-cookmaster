const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {
  UNPROCESSABE_ENTITY,
  CREATED,
  OK,
  ID_LENGTH,
  BAD_REQUEST,
  UNAUTHORIZED,
  MIN_PASS_LENGTH,
} = require('./consts');
const { addRecipe, getAllRecipes } = require('../models/recipesModel');
const { getToken, secret, decodeToken } = require('./jwt');

const app = express();
app.use(bodyParser.json());

const recipesValidation = (body) => {
  const { name, ingredients, preparation } = body;
  if (!name || !ingredients || !preparation ) {
    throw {
      status: BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
  }
};

// 3 - Crie um endpoint para o cadastro de receitas
const registerRecipe = async(body, user, res) => {
  try {
    recipesValidation(body);
    const recipe = await addRecipe(body, user);
    return res.status(CREATED).json({recipe: recipe});
  } catch (error) {
    return res.status(error.status).json({'message': error.message});
  }
};

// 4 - Crie um endpoint para a listagem de receitas
const findAllRecipes = async (res) => {
  const allRecipes = await getAllRecipes();
  return res.status(OK).json(allRecipes);
};

module.exports = {
  findAllRecipes,
  registerRecipe,
};