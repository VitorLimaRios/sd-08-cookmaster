const rescue = require('express-rescue');

const Services = require('../services/recipe');

const CREATED = 201;

module.exports = rescue(async (req, res) => {
  // console.log('CONTROLLER createRecipe req.body', req.body);
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const recipe = await Services.createRecipe(token, name, ingredients, preparation);
  // console.log('CONTROLLER createRecipe recipe', recipe);
  if (!recipe) throw Error;
  res.status(CREATED).json({ recipe });
});
