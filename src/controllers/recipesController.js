const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');
const CREATED_STATUS = 201;

const registerRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const {userId} = req;
  const result = await recipeService.registerRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  if (result.err) return next(result);
  res.status(CREATED_STATUS).json(result);
});

module.exports = {
  registerRecipe,
};
