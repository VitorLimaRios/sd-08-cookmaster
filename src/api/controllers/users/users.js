const rescue = require('express-rescue');

const {
  getAllServices,
  addServices,
  generateToken,
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


module.exports = {
  getAllUsers,
  addUsers,
  loginUsers,
};
