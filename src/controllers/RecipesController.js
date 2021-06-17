const RecipesService = require('../services/RecipesService');

const ERROR = 500;

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    console.log(name, ingredients, preparation);
    const token = req.headers['authorization'];
    const { CREATED, message } = await RecipesService
      .createRecipe(name, ingredients, preparation, token);
    return res.status(CREATED).json(message);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

module.exports = {
  createRecipes,
};