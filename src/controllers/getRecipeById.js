const RecipesService = require('../services/RecipesService');
const rescue = require('express-rescue');

const OK_STATUS = 200;

module.exports = rescue(async (req, res ) => {
  const { id } = req.params;
  const recipe = await RecipesService.findById(id);
  if(recipe.error) return res
    .status(recipe.error.code).json({ message: recipe.error.message });

  return res.status(OK_STATUS).json(recipe);
});
