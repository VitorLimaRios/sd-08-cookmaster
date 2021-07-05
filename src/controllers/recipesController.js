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

const getByRecipes = async (req, res) => {
  const idRecipes = req.params.id;
  const result = await recipesServices.getByRecipes(idRecipes);
  if (result == null) {
    return res.status(status.NOT_FOUND).json({ message: status.MESSAGE });
  };

  try {
    res.status(status.OK).json(result);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }

};

const updateRecipes = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  // console.log(req.user);
  const upRecipe = req.body;

  const result = await recipesServices.updateRecipes(id,
    upRecipe, userId);
  res.status(status.OK).json(result);


};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
  updateRecipes,
};