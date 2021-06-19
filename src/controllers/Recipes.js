const models = require('../models/Recipes');
const { validateToken } = require('../services/tokenValidate');
const { checkRecipesData } = require('../middlewares');
const userSchemas = require('../schemas');
const Created = '201';
const Unauthorized = '401';
const OK = '200';



const { Router } = require('express');
const { object } = require('joi');

const recipesController = Router();

recipesController.post('/', checkRecipesData(userSchemas), async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const valid = validateToken(token);
  if (!valid) return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const recipe = await models.create(name, ingredients, preparation, valid._id);
  res.status(Created).json({ recipe: recipe.ops[0] });
});

recipesController.get('/', async (_req, res) => {
  const recipes = await models.getAll();
  res.status(OK).send(recipes);
});

module.exports = recipesController;
