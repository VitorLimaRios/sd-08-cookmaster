const recipesModel = require('../models/recipesModel');

const validUser = async (req, _res, next) => {
  const recipe = await recipesModel.findRecipes(req.params.id);
  const { userId } = recipe;
  if ((userId.toString() !== req.user._id.toString()) && req.user.role === 'user')
    return { code: UNAUTHORIZED, message: { message: 'user not authorized' } };
  next();
};

module.exports = validUser;
