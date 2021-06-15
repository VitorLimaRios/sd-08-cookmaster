const rescue = require('express-rescue');

const {
  registerRecipes,
  allRecipes,
  idRecipes,
} = require('../../services/recipes/recipes');

const DOU = 201;
const DOO = 200;

const registerRec = rescue(async (req, res, next) => {
  const { _id: userId } = req.params;
  const { name, ingredients,preparation } = req.body;
  const recipe = await registerRecipes({ userId, name, ingredients, preparation });
  if (recipe.status) return next(recipe);
  res.status(DOU).json({ recipe });
});

const allRec = rescue(async (_req, res) => {
  const result = await allRecipes();
  res.status(DOO).json(result);
});

const idRec = rescue(async (req, res, next) => {
  const id = req.params;
  const result = await idRecipes(id);
  if (result.status) return next(result);
  res.status(DOO).json(result);
});
module.exports = {
  registerRec,
  allRec,
  idRec,
};