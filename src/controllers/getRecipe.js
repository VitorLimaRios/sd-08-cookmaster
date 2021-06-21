const Services = require('../services/recipe');

const SUCCEEDED = 200;
const INTERNALSERVERERROR = 500;

module.exports = async (_req, res) => {
  try {
    const recipes = await Services.getRecipes();
    if (!recipes) throw Error;
    res.status(SUCCEEDED).json(recipes);
  } catch (err) {
    res.status(INTERNALSERVERERROR).json({ message: 'Erro interno', error: err.message });
  }
};