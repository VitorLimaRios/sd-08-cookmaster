const { createRecipe } = require('../services/recipeFunctions.service');
const { StatusCodes: { 
  CREATED, BAD_REQUEST, 
} } = require('http-status-codes');

exports.register = async (req, res) => {
  const form = req.body;
  try {
    const recipe = await createRecipe(form);
    res.status(CREATED).json(recipe);
  } catch (err) {
    res.status(BAD_REQUEST).json({message: err.message});
  }
};