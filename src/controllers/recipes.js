const rescue = require('express-rescue');

const RecipeServices = require('../services/recipes');

const STATUS_201 = 201;

const create = rescue(async (req, res) => {
  const token = req.headers['authorization'];
  const { name, ingredients, preparation } = req.body;
  const recipe = await RecipeServices
    .create(token, name, ingredients, preparation);
  res.status(STATUS_201).json(recipe);
});

module.exports = {
  create
};
