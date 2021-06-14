const express = require('express');
const recipesModels = require('../models/recipesModels');
const validateJWT = require('../auth/validateJWT');
const validateRecipes = require('../middlewares/recipesValidation');
const { status } = require('../schema/status');

const routes = express.Router();

routes.post('/', validateJWT, validateRecipes, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  const response = await recipesModels.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );
  return res.status(status.created).json({ recipe: response });
});

module.exports = routes;
