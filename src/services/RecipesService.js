const User = require('../models/User');
const Recipe = require('../models/Recipe');
const JWT = require('jsonwebtoken');
const SECRET = 'meusegredosuperseguro';
const msg = require('../validators/ErrorMessages');
const { validationResult } = require('express-validator');

module.exports = {
  verifyEntries: (entries) => {
    const result = validationResult(entries);
    if (!result.isEmpty()) {
      return result.errors[0].msg;
    } else {
      return false;
    }
  },
  addRecipe: async (userId, name, ingredients, preparation) => {
    const newRecipe = {
      userId,
      name,
      ingredients,
      preparation,
    };
    const recipeCreated = await Recipe.save(newRecipe);
    return { code: msg.status.created, recipe: recipeCreated };
  },
};
