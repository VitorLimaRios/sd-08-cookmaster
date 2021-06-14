const { ObjectId } = require('mongodb');
const recipesModels = require('../models/recipes');

const BAD_REQUEST = 401;
const NOT_FOUND = 404;

const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).json({message: 'invalid id'});
  }
  const getRecipe = await recipesModels.getById(id);
  if (!getRecipe) {
    return res.status(NOT_FOUND).json({message: 'recipe not found'});
  }

  const recipeCreatorId = ObjectId(getRecipe.userId).toString();
  const recipeHandlerId = ObjectId(user._id).toString();

  if (!(recipeHandlerId === recipeCreatorId || user.role === 'admin')) {
    throw new Error401('missing auth token');
  }

  next();
};

module.exports = validateUser;
