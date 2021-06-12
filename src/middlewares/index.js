const userValidation = require('./userValidation');
const error = require('./error');
const loginValidation = require('./loginValidation');
const recipeValidation = require('./recipeValidation');
const auth = require('./auth');

module.exports = {
  userValidation,
  error,
  loginValidation,
  recipeValidation,
  auth,
};