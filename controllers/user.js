const rescue = require('express-rescue');
const service = require('../services/user');

const OK = 200;
const CREATED = 201;

const getAllUsers = rescue(async (_req, res) => {
  const users = await service.getAll();
  return res.status(OK).json(users);
});

const createUsers = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const createdUser = await service.add(name, email, password);
  if (createdUser.error) return next(createdUser);
  return res.status(CREATED).json(createdUser);
});

module.exports ={
  getAllUsers,
  createUsers,
};