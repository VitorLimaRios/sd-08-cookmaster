const jwt = require('jsonwebtoken');

const model = require('../models/Recipes');
const { recipeSchema } = require('./validation');

const HTTP = require('../utils/httpStatusCodes');
const generateError = require('../utils/generateError');

const { SECRET } = require('../utils/doNotLook');

const createRecipe = async (recipe, token) => {
  try {
    if (recipeSchema.validate(recipe).error) {
      throw generateError(HTTP.BAD_REQUEST, 'Invalid entries. Try again.');
    }

    const { user } = jwt.verify(token, SECRET);

    return {
      status: HTTP.CREATED,
      result: await model.createRecipe({ ...recipe, userId: user._id }),
    };
  } catch (err) {
    return err;
  }
};

module.exports = { createRecipe };
