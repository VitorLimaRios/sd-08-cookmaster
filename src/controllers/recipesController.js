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

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getRecipeById(id);
    return res.status(code.OK).json(recipe);
  } catch (error) {
    res.status(code.NOT_FOUND).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesServices.updateRecipe(id, name, ingredients, preparation);
    return res.status(code.OK).json(recipe);
  } catch (error) {
    //console.log(error.message);
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.deleteRecipe(id);
    res.status(code.NO_CONTENT).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
