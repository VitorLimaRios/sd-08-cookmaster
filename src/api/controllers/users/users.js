const rescue = require('express-rescue');

const {
  getAllServices,
  addServices,
  generateToken,
  registerRecipes,
  allRecipes,
} = require('../../services/users/users');

const DOU = 201;
const DOO = 200;

const getAllUsers = rescue(async (_req, res) => {
  const users = await getAllServices();
  res.status(DOU).json(users);
});

const addUsers = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await addServices({ name, email, password });
  if (user.status) return next(user);
  res.status(DOU).json({ user });
});

const loginUsers = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await generateToken({ email, password });
  if (token.status) return next(token);
  res.status(DOO).json({ token });
});

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

module.exports = {
  getAllUsers,
  addUsers,
  loginUsers,
  registerRec,
  allRec,
};
