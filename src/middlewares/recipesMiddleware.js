const jwt = require('jsonwebtoken');
const RecipesModel = require('../models/RecipesModel');

const secret = 'trybe123';

const errors = {
  invalid_entries: 'Invalid entries. Try again.',
  malformed: 'jwt malformed',
  message: 'recipe not found',
  missing: 'missing auth token'
};

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;
const TOKEN_LENGTH = 20;
const ID_LENGTH = 24;

const validateEntries = (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      return res.status(BAD_REQUEST).json({ message: errors.invalid_entries  });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: 'Hmm, e agora?' });
  }
  next();
};

const validateMalformedToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (token.length < TOKEN_LENGTH) {
      return res.status(UNAUTHORIZED).json({ message: errors.malformed });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: 'Hmm, e agora?' });
  }
  next();
};

const validateTokenAuthentication = async (req, res, next) => {
  try {
    const { id: recipeId } = req.params;
    const token = req.headers['authorization'];
    const { id, role } = jwt.verify(token, secret);
    const { userId } = await RecipesModel.getRecipeById(recipeId);
    if (!role === 'admin' || !id === userId) {
      return res.status(UNAUTHORIZED).json({ message: errors.malformed });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err });
  }
  next();
};

const validateMissingToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: errors.missing });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err });
  }
  next();
};

const verifyId = async (req, res, next) => {
  const { id } = req.params;
  if (id.length < ID_LENGTH) {
    return res.status(NOT_FOUND).json({ message: errors.message });
  }
  next();
};

module.exports = {
  validateEntries,
  validateMalformedToken,
  validateTokenAuthentication,
  validateMissingToken,
  verifyId,
};
