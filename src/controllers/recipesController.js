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

module.exports = {
  createRecipes,
};