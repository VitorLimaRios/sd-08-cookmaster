const recipesServices = require('../services/recipesServices');
const status = require('../statuscode/status');

const createRecipes = async (req, res) => {
  try {

    const { name, ingredients, preparation } = req.body;
    const token = req.headers['authorization'];
    const result = await recipesServices.createRecipes(
      name, ingredients, preparation, token);
    res.status(status.CREATE).json({ 'recipe': result });

  } catch (err) {

    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err });

  }
};

module.exports = {
  createRecipes,
};