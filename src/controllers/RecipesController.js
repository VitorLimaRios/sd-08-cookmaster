const RecipesService = require('../services/RecipesService');
const UserService = require('../services/UserService');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const msg = require('../validators/ErrorMessages');
module.exports = {
  addRecipe: async (req, res) => {
    const token = req.headers['authorization'];
    const { name, ingredients, preparation } = req.body;
    const entries = await RecipesService.verifyEntries(req);
    if (entries) {
      return res.status(entries.code).json({ message: entries.message });
    }
    const data = await UserService.verifyToken(token);
    const { _id } = await User.findUserByEmail(data.email);
    const result = await RecipesService.addRecipe(
      _id,
      name,
      ingredients,
      preparation,
    );
    res.status(result.code).json({ recipe: result.recipe });
  },
  list: async (req, res) => {
    const recipes = await Recipe.getRecipes();
    res.status(msg.status.ok).json(recipes);
  },
};
