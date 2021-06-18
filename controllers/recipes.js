const services = require('../services/recipes');

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

module.exports = {
  createRecipe,
}; 