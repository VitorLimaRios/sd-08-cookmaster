const { recipesServices } = require('../services');
const {
  recipesCreate,
} = recipesServices;

const OK = 201;
const BAD = 400;
const UNAUTHORIZED = 401;

const registerRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    
    const result = await recipesCreate(name, ingredients, preparation, authorization);

    if (result.message === 'Invalid entries. Try again.')
      return res.status(BAD).json(result);

    if (result.message === 'jwt malformed')
      return res.status(UNAUTHORIZED).json(result);

    return res.status(OK).json(result);
  } catch (error) {

    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = {
  registerRecipes,
};