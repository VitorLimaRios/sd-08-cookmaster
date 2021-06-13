const { checkSchema } = require('express-validator');
const msg = require('./ErrorMessages');

const errorMessage = {
  code: msg.status.badRequest,
  message: msg.invalidEntries,
};

module.exports = {
  addRecipes: checkSchema({
    name: {
      trim: true,
      notEmpty: true,
      errorMessage,
    },
    ingredients: {
      notEmpty: true,
      errorMessage,
    },
    preparation: {
      notEmpty: true,
      errorMessage,
    },
  }),
};
