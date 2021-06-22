const modelsRecipes = require('../models/Recipes');
const { validateToken } = require('../services/tokenValidate');
const { checkRecipesData } = require('../middlewares');
const userSchemas = require('../schemas');
const Created = '201';
const Unauthorized = '401';
const OK = '200';
const Not_Found = '404';
const No_Content = '204';

const { Router } = require('express');
const recipesController = Router();

recipesController.post('/', checkRecipesData(userSchemas), async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const valid = validateToken(token);
  if (!valid) return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const recipe = await modelsRecipes.create(name, ingredients, preparation, valid._id);
  res.status(Created).json({ recipe: recipe.ops[0] });
});

recipesController.get('/', async (_req, res) => {
  const recipes = await modelsRecipes.getAll();
  res.status(OK).send(recipes);
});

recipesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await modelsRecipes.getById(id);
  if (!recipe) return res.status(Not_Found).json({ message: 'recipe not found' });
  res.status(OK).json(recipe);
});

recipesController.put('/:id', checkRecipesData(userSchemas), async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token)
    return res.status(Unauthorized).json({ message: 'missing auth token'});
  const valid = validateToken(token);
  if (!valid)
    return res.status(Unauthorized).json({ message: 'jwt malformed' });
  if (valid._id || valid.role === 'admin') {
    const recipe = await modelsRecipes.update(id, name, ingredients, preparation);
    recipe.result.ok ? (result = await modelsRecipes.getById(id)) : '';
  }
  res.status(OK).json(result);
});

recipesController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token)
    return res.status(Unauthorized).json({ message: 'missing auth token'});
  const valid = validateToken(token);
  if (!valid)
    return res.status(Unauthorized).json({ message: 'jwt malformed' });
  const recipe = await modelsRecipes.getById(id);
  if (valid._id === recipe.userId || valid.role === 'admin') {
    const response = await modelsRecipes.del(id);
    response.result.ok
      ? res.status(No_Content).end()
      : res.status(Unauthorized).json({ message: 'missing auth token' });
  } else return res.status(Unauthorized).json({ message: 'missing auth token' });
});

module.exports = recipesController;
