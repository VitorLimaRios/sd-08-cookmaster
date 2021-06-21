const recipeModel = require('../models/recipeModel');

const error = 401;

const userValidation = async (req, _res, next) => {
  const recipe = await recipeModel.getRecipeById(req.params.id);
  const { userId } = recipe;
  if ((userId.toString() !== req.user._id.toString()) && req.user.role === 'user') {
    return { code: error, message: { message: 'user not authorized' } };
  }
  next();
};

module.exports = {
  userValidation
};
