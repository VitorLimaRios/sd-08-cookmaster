const { recipesServices } = require('../services');
const {
  recipesCreate,
  getRecipes,
  recipesById,
} = recipesServices;

const SUCCESS = 200;
const CREATED = 201;
const BAD = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const registerRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    
    const result = await recipesCreate(name, ingredients, preparation, authorization);

    if (result.message === 'Invalid entries. Try again.')
      return res.status(BAD).json(result);

    if (result.message === 'jwt malformed')
      return res.status(UNAUTHORIZED).json(result);

    return res.status(CREATED).json(result);
  } catch (error) {

    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

const getAllRecipes = async (_req, res) => {
  try {

    const result = await getRecipes();

    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(BAD).json(error);
  }
};

const getRecipesById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesById(id);

    if (result.message === 'recipe not found')
      return res.status(NOT_FOUND).json(result);

    return res.status(SUCCESS).json(result);
  } catch (error) {
    return res.status(BAD).json(error);
  }
};

module.exports = {
  registerRecipes,
  getAllRecipes,
  getRecipesById,
};