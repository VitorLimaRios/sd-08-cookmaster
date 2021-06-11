const RecipeModel = require('../../models/index');

const SUCCESS_CODE = 200;

module.exports = async (_req, res, _next) => {
  const response = await RecipeModel.getAllRecipes();

  res.status(SUCCESS_CODE).json(response);
};
