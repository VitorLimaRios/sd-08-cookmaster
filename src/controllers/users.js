const rescue = require('express-rescue');

const UserService = require('../services/users');

const STATUS_201 = 201;

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await UserService
    .create({name, email, password, role: 'user'});
  res.status(STATUS_201).json(newUser);
});

const createAdmin = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const token = req.headers['authorization'];
  const newUser = await UserService.create({name, email, password, role: 'admin', token});
  res.status(STATUS_201).json(newUser);
});



module.exports = {
  create,
  createAdmin
};
