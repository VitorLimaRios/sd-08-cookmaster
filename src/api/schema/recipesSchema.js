const { findByName } = require('../models/recipesModel');

const validate = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return {
    status: 400,
    error: {
      message: 'Invalid entries. Try again.',
    }
  };
  
  return null;
};

const recipeExists = async (name) => {
  if (await findByName(name)) return {
    status: 409,
    error: {
      message: 'Email already registered'
    }
  };
  return;
};

module.exports = {
  validate,
  recipeExists,
};
