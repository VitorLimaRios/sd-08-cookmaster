const service = require('../service/recipesService');

const success = 201;
const success2 = 200;
const success3 = 204;
const fail = 400;
const fail2 = 404;
const fail3 = 401;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const addRecipe = await service
      .createRecipe(name, ingredients, preparation, userId);
    res.status(success).json(addRecipe);
  } catch (err) {
    res.status(fail).json({
      message: err.message,
    });
  }
};

const getAll = async (_req, res) => {
  try {
    const recipes = await service.getAll();
    res.status(success2).json(recipes);
  } catch (err) {
    res.status(fail).json({ message: err.message });
  }
};

const recipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await service.recipeById(id);
    res.status(success2).json(recipe);
  } catch (err) {
    res.status(fail2).json({
      message: err.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const update = await service.updateRecipe(id, name, ingredients, preparation);
    res.status(success2).json(update);
  } catch (err) {
    res.status(fail3).json({
      message: err.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteRecipe(id);
    res.status(success3).json(deleted);
  } catch (err) {
    res.status(fail).json({ message: err.message });
  };
};

module.exports = {
  createRecipe,
  getAll,
  recipeById,
  updateRecipe,
  deleteRecipe,
};
