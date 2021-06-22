const rescue = require('express-rescue');
const service = require('../services/Recipes');
const recipeSchema = require('../schemas/RecipeSchema');

const CREATED = 201;

const create = rescue(async (req, res, next) => {

  const { error } = recipeSchema.validate(req.body);

  if (error) return next(error);

  const { name, ingredients, preparation } = req.body;

  const { _id } = req.user;

  const recipe = await service.create({ name, ingredients, preparation, userId: _id });

  if (recipe.error) return next(recipe.error);

  res.status(CREATED).json(recipe);
});

module.exports = {
  create,
};