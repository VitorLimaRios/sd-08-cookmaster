const rescue = require('express-rescue');

const serviceRecipe = require('../services/recipes');

const ok = 201;

const create = rescue(async (req, res) => {
  const token = req.headers['authorization'];
  const { name, ingredients, preparation } = req.body;
  const recipe = await serviceRecipe
    .create(token, name, ingredients, preparation);
  res.status(ok).json(recipe);
});

module.exports = {
  create
};