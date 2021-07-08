const RecipeModels = require('../models/recipes');
const { ObjectId } = require('mongodb');

const BAD_REQUEST = 401;
const NOT_FOUND = 404;

const userValid = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!ObjectId.isValid(id)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'Bad request. Invalid id.' });
  }

  const recipeById = await RecipeModels.getRecipeById(id);
  if (!recipeById) {
    return res
      .status(NOT_FOUND)
      .json({ message: 'Recipe not found by this id.' });
  }

  const admin = ObjectId(recipeById.userId).toString();
  const newAdmin = ObjectId(user._id).toString();
  if (!(admin === newAdmin || user.role === 'admin')) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'missing auth token' });
  }

  next();
};

module.exports = userValid;
