const recipesServices = require('../services/recipesServices');
const { code } = require('../helpers/messages');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user.id;
    const newRecipe = await recipesServices.createRecipe(
      name,
      ingredients,
      preparation,
      userId
    );
    res.status(code.CREATED).json(newRecipe);
  } catch (error) {
    console.log('controller',error.message);
    if (newRecipe.error === 'Invalid entries. Try again.') {
      res.status(code.BAD_REQUEST).json({ message: error.message });
    }
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const user = await recipesServices.getAllRecipes();
    res.status(code.OK).json(user);
  } catch (error) {
    res.status(code.BAD_REQUEST).json(error.message);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};