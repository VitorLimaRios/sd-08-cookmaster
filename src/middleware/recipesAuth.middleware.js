const jwt = require('jsonwebtoken');
const {
  INVALID_TOKEN,
  INVALID_ENTRIES,
  JWT_MALFORMED,
  RECIPE_NOT_FOUND,
} = require('../shared/errorMessage');
const {
  HTTP_400_STATUS,
  HTTP_401_STATUS,
  HTTP_404_STATUS,
} = require('../shared/httpTypes');
const userModels = require('../models/user.models');
const recipeModels = require('../models/recipes.modules');

const authenticationByToken = async (req, res, cb) => {
  const token = req.headers['authorization'].split(' ')[1];
  const secret = 'seusecretdetoken';

  if (!token) {
    return res.status(HTTP_401_STATUS).json({
      message: JWT_MALFORMED,
    });
  }

  const decoded = jwt.verify(token, secret);
  const user = await userModels.findOneUserByEmail(decoded.email);

  if (!user) {
    return res.status(HTTP_400_STATUS).json({
      message: INVALID_TOKEN,
    });
  }
  cb();
};

const recipeValidate = async (req, res, cb) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(HTTP_400_STATUS).json({
      message: INVALID_ENTRIES,
    });
  }
  cb();
};

const recipeIdValidate = async (req, res, cb) => {
  const { id } = req.params;

  const searchResult = await recipeModels.findOneRecipeById(id);

  if (!searchResult) {
    return res.status(HTTP_404_STATUS).json({
      message: RECIPE_NOT_FOUND,
    });
  }
  cb();
};

module.exports = {
  authenticationByToken,
  recipeValidate,
  recipeIdValidate,
};
