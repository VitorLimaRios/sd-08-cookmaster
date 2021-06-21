const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const response = await recipeService.createRecipe({ ...req.body, _id: req.user._id });
  res.status(response.code).json(response.message);
};

module.exports = {
  createRecipe
};
