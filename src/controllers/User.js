const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const userService = require('../services/User');

const CREATED = 201;

const create = rescue(async (req, res, _next) => {
  const { name, email, password } = req.body;
  const createdUser = await userService.create({ name, email, password });
  if (!createdUser) throw boom.conflict('Email already registered');
  res.status(CREATED).json(createdUser);
});

module.exports = {
  create,
};