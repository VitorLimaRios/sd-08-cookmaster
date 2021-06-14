const recipesService = require('../services/recipes');

const { code } = require('../helper/status');

const anError = (err, res) => {
  console.log('caiu no catch/n/n/n', err);
  const { status, message } = JSON.parse(err.message);
  res.status(status).json({ message });
};

const readRecipes = (_req, res) => {
  recipesService.readRecipes()
    .then((response) => res.status(code.OK).json(response))
    .catch(console.log);
};

const readRecipeById = (req, res) => {
  const {id} = req.params;

  recipesService.readRecipeById(id)
    .then((response) => res.status(code.OK).json(response))
    .catch(err => anError(err, res));
};

const createRecipe = (req, res) => {
  const recipe = req.body;
  const token = req.headers.authorization;

  recipesService.createRecipe(recipe, token)
    .then(response => res.status(code.CREATED).json({ recipe: response}))
    .catch(err => anError(err, res));
};

const updateRecipe = (req, res) => {

  const recipe = req.body;
  const token = req.headers.authorization;
  const { id } = req.params;

  recipesService.updateRecipe(token, recipe, id)
    .then(response => res.status(code.OK).json(response))
    .catch(err => anError(err, res));
};

module.exports = {
  readRecipes,
  readRecipeById,
  createRecipe,
  updateRecipe,
};