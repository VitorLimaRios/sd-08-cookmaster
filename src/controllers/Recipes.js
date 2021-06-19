const models = require('../models/Recipes');
const { validateToken } = require('../services/tokenValidate');
const { checkRecipesData } = require('../middlewares');
const userSchemas = require('../schemas');
const Created = '201';
const Unauthorized = '401';



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

module.exports = recipesController;
