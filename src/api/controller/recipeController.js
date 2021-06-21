const service = require('../service/recipeService');
const rescue = require('express-rescue');

const CODE_201 = 201;
const CODE_200 = 200;
const CODE_400 = 400;
const CODE_404 = 404;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await service.createRecipe(name, ingredients, preparation, userId);
    res.status(CODE_201).json(newRecipe);
  } catch (e) {
    return res.status(CODE_400).json({
      message: e.message
    });
  };
};

const getAll = rescue(async (_req, res) => {
  const recipes = await service.getAll();
  res.status(CODE_200).json(recipes);
});

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await service.getById(id);

    return res.status(CODE_200).json(recipe);
  } catch (e) {
    return res.status(CODE_404).json({ message: e.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
