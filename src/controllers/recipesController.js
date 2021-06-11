const FIVE_HUNDRED = 500;

const recipesServices = require('../services/recipesService');

const createRecipe = async (req, res) => {
  try {
    const user = req.user;
    const { name, ingredients, preparation } = req.body;
    const result = await recipesServices
      .addRecipesServices({ name, ingredients, preparation }, user);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    res.status(FIVE_HUNDRED).json({
      message: 'Erro',
    });
  }
};

const getAllRecipes = async (__req, res) => {
  try {
    const result = await recipesServices.getAllRecipesService();
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    res.status(FIVE_HUNDRED).json({
      message: 'Erro',
    });
  }
};

const getRecipeId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesServices.getRecipeIdServices(id);
    res.status(result.statusCode).json(result.json);
  } catch (error) {
    res.status(FIVE_HUNDRED).json({
      message: 'Erro',
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeId
};
