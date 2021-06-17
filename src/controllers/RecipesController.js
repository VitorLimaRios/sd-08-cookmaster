const RecipesService = require('../services/RecipesService');

const ERROR = 500;
const OK = 200;

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers['authorization'];
    const { CREATED, message } = await RecipesService
      .createRecipe(name, ingredients, preparation, token);
    return res.status(CREATED).json(message);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const getAll = await RecipesService.getAllRecipes();
    return res.status(OK).json(getAll);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await RecipesService.getRecipeById(id);
    return res.status(OK).json(getId);
  } catch (err) {
    res.status(ERROR).json({ message: err });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};