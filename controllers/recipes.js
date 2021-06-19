const services = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const BAD = 400;
const NOT_FOUND = 404;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user.id;
    const newRecipe = await services.createRecipe(
      name,
      ingredients,
      preparation,
      userId
    );
    res.status(CREATED).json(newRecipe);
  } catch (error) {
    (newRecipe.error === 'Invalid entries. Try again.') && res
      .status(BAD).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const user = await services.getAll();
    res.status(OK).json(user);
  } catch (error) {
    res.status(BAD).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await services.getById(id);
    return res.status(OK).json(recipe);
  } catch (error) {
    res.status(NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAll,
  getById,
}; 