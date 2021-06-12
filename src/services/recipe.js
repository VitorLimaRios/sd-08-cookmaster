const recipe = require('../models/recipe');

const CREATED = 201;

const post = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipeObject = await recipe.create(name, ingredients, preparation, req.userId);
  res.status(CREATED).json({ 'recipe': recipeObject.ops[0] });
};

module.exports = {
  post,
};
