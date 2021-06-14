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
  listOne: async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.getOneRecipe(id);
    if (recipe._id) {
      return res.status(msg.status.ok).json(recipe);
    } else {
      return res.status(recipe.code).json({ message: recipe.message });
    }
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const token = req.headers['authorization'];
    if (!token) {
      return res
        .status(msg.status.unauthorized)
        .json({ message: msg.tokenMissed });
    }
    const data = await UserService.verifyToken(token);
    if (data.hasOwnProperty('code')) {
      return res.status(data.code).json({ message: data.message });
    }
    const user = await User.findUserByEmail(data.email);
    if (!user) {
      return res
        .status(msg.status.unauthorized)
        .json({ message: msg.errorJWT });
    }
    const recipeEdited = await Recipe.editRecipe(id, req.body);
    if (recipeEdited) {
      const result = {
        _id: id,
        userId: user._id,
        ...req.body,
      };
      res.status(msg.status.ok).json(result);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const token = req.headers['authorization'];
    if (!token) {
      return res
        .status(msg.status.unauthorized)
        .json({ message: msg.tokenMissed });
    }
    const data = await UserService.verifyToken(token);
    if (data.hasOwnProperty('code')) {
      return res.status(data.code).json({ message: data.message });
    }
    await Recipe.deleteRecipe(id);
    return res.status(msg.status.noContent).json();
  }
};
