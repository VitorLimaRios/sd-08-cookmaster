const service = require('../service/recipeService');
const rescue = require('express-rescue');


const CREATED = 201;
const OK = 200;
const NOT_VALID = 400;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await service.createRecipe(name, ingredients, preparation, userId);
    
    res.status(CREATED).json(newRecipe);
  } catch (e) {
    return res.status(NOT_VALID).json({
      message: e.message,
    });
  }
};

const getAll = rescue(async (_req, res) => {
  const recipes = await service.getAll();
  res.status(OK).json(recipes);
});

module.exports = {
  create,
  getAll,
};
