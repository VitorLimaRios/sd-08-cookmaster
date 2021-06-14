const service = require('../service/recipesService');

const success = 201;
const success2 = 200;
const fail = 400;

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

module.exports = {
  createRecipe,
  getAll,
};
