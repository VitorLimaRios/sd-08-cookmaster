const rescue = require('express-rescue');
const RecipesService = require('../services/RecipesService');

const CREATED = 201;

module.exports = rescue(async (req, res) => {
  const recipe = req.body;
  const id = req.user.id;

  const newRecipe = await RecipesService.create(id, recipe);
  if(newRecipe.error) return res
    .status(newRecipe.error.code).json({ message: newRecipe.error.message});

  return res.status(CREATED).json({ recipe: newRecipe });
});
