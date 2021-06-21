const Services = require('../services/recipe');

const CREATED = 201;
const BADREQUEST = 400;
const UNAUTHORIZED = 401;
const INTERNALSERVERERROR = 500;

module.exports = async (req, res) => {
  try {
    // console.log('CONTROLLER createRecipe req.body', req.body);
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const recipe = await Services.createRecipe(token, name, ingredients, preparation);
    // console.log('CONTROLLER createRecipe recipe', recipe);
    if (!recipe) throw Error;
    res.status(CREATED).json({ recipe });
  } catch (err) {
    if (err.message === 'Invalid entries. Try again.') {
      return res.status(BADREQUEST).json({ message: err.message });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Erro interno', error: err.message });
  }
};
