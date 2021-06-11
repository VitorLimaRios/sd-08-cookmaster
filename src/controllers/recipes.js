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

const createRecipe = (req, res) => {
  const recipe = req.body;
  const token = req.headers.authorization;

  recipesService.createRecipe(recipe, token)
    .then(response => res.status(code.CREATED).json({ recipe: response}))
    .catch(err => anError(err, res));
};

module.exports = {
  readRecipes,
  createRecipe,
};