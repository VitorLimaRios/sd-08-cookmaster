const recipesServices = require('../services/recipesServices');
const status = require('../statuscode/status');

const createRecipes = async (req, res) => {
  const userId = req.user._id;
  const { name, ingredients, preparation } = req.body;

  try {
    // const token = req.headers.authorization;
    const result = await recipesServices.createRecipes(
      name, ingredients, preparation, userId);
    res.status(status.CREATE).json({ 'recipe': result });

  } catch (err) {

    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err });

  }

  // console.log(req.user._id);
};

const getAllRecipes = async (req, res) => {
  try {
    const result = await recipesServices.getAllRecipes();
    res.status(status.OK).json(result);
    
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
    console.log(result);
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
};