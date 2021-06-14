const rescue = require('express-rescue');
const Recipe = require('../../services/recipes/Recipes');
const { ERRORS, STATUS_201 } = require('../../utils/consts');
const JWTValidation = require('../../utils/JWTValidation');

const create = rescue(async (req, res) => {
  const { eToken } = ERRORS;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(eToken.status).json({ message: eToken.message });
  const data = JWTValidation(token);
  if (!data._id) return res.status(eToken.status).json({ message: eToken.message });
  const userId = data._id;
  const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return res.status(STATUS_201).json({ recipe: newRecipe });
});

module.exports = {
  create,
};