const service = require('../service/recipesService');

const OK = 200;
const Created = 201;
const notValid = 400;
const invalid = 401; 


const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await service.
      createRecipes( name, ingredients, preparation, req.userId );
    return res.status(Created).json(newRecipe);
  } catch (err) {
    return res.status(notValid).json({
      message: err.message,
    });
  }
};

const getAll = async (_req, res) => {
  const recipes = await service.getAllRecipes();

  return res.status(OK).json(recipes);
};

module.exports = {
  create,
  getAll,
};