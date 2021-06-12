const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const userService = require('../services/User');
const crypto = require('crypto');

const EIGHT = 8;
const secret = crypto.randomBytes(EIGHT).toString('hex');
const CREATED = 201;

const create = rescue(async (req, res, _next) => {
  const { name, email, password } = req.body;
  const createdUser = await userService.create({ name, email, password });
  if (!createdUser) throw boom.conflict('Email already registered');
  res.status(CREATED).json(createdUser);
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.getUser(email);
  if (!user || user.password !== password)
    throw boom.unauthorized('Incorrect username or password');

  const jwtConfig = { expiresIn: '12h', algorithm: 'HS256' };

  const data = { name: user.name, email };

  const token = jwt.sign({ data }, secret, jwtConfig);

  res.json({ token });
});

module.exports = {
  create,
  login,
};