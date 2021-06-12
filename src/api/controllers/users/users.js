const rescue = require('express-rescue');

const {
  getAllServices,
  addServices,
} = require('../../services/users/users');

const DOU = 201;

const getAllUsers = rescue(async (_req, res) => {
  const users = await getAllServices();
  res.status(DOU).json(users);
});

const addUsers = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const users = await addServices({ name, email, password });
  if (users.status) return next(users);
  res.status(DOU).json(users);
});

module.exports = {
  getAllUsers,
  addUsers,
};
