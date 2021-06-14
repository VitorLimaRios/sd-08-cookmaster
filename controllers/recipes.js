const recipesService = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user._id;
  const result = await recipesService.createRecipe(name, ingredients, preparation, _id);
  res.status(result.code).json(result.message);
};

module.exports = {
  createRecipe,
};
