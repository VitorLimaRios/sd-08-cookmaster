const rescue = require('express-rescue');

const {
  registerRecipes,
  allRecipes,
  idRecipes,
  editRecipes,
  deleteRecipes,
} = require('../../services/recipes/recipes');

const DOU = 201;
const DOO = 200;
const DOQ = 204;

const registerRec = rescue(async (req, res, next) => {
  const { _id: userId } = req.users;
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
  const { id } = req.params;
  const result = await idRecipes(id);
  if (result.status) return next(result);
  res.status(DOO).json(result);
});

const editRec = rescue(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const result = await editRecipes(id, body);
  if (result.status) return next(result);
  const show = { ...result, userId: id };
  res.status(DOO).json(show);
});

const deleteRec = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteRecipes(id);
  if (result.status) return next(result);
  res.status(DOQ).json(result);
});

module.exports = {
  registerRec,
  allRec,
  idRec,
  editRec,
  deleteRec,
};
