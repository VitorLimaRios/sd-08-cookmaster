const recipesService = require('../services/recipes');

const { code } = require('../helper/status');

const anError = (err, res) => {
  console.log(err, 'caiu no catch/n/n/n');
  const { status, message } = JSON.parse(err.message);
  res.status(status).json({ message });
};

const readRecipes = (_req, res) => {
  recipesService.readRecipes()
    .then((response) => res.status(code.OK).json(response))
    .catch(console.log);
};

const createRecipe = (req, res) => {
  const token = req.headers.authorization;
  const recipe = req.body;

  recipesService.createRecipe(token, recipe)
    .then(response => res.status(code.OK).json(response))
    .catch(err => anError(err, res));
};

module.exports = {
  readRecipes,
  createRecipe,
};