const services = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const BAD = 400;

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

module.exports = {
  createRecipe,
  getAll
}; 