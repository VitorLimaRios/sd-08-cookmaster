const Recipes = require('../services/Recipes');

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;

  const addNewRecipe = await Recipes.newRecipe(name, ingredients, preparation, userId);
  res.status(201).json(addNewRecipe);
};

module.exports = {
  newRecipe,
};
