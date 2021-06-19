const jwt = require('jsonwebtoken');
const Joi = require('joi');
const usersModels = require('../models/users');
const { Error400, Error401, Error409 } = require('../errors/');

const secret = 'umaSenhaMuitoDoida';
const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(validEmailRegex).required(),
  password: Joi.string().required(),
  role: Joi.string(),
});

const add = async (user) => {
  const emailAlreadyExists = await usersModels.findByEmail(user.email);
  if (emailAlreadyExists) {
    throw new Error409('Email already registered');
  }

  const { error } = createUserSchema.validate(user);
  if (error) {
    throw new Error400('Invalid entries. Try again.');
  }

  if (!user.role) {
    user = { ...user, role: 'user' };
  }

  const { password, ...userInfo } = await usersModels.add(user);

  return userInfo;
};

const login = async (userLogin) => {
  if (!userLogin.email || !userLogin.password) {
    throw new Error401('All fields must be filled');
  }

  const result = await usersModels.findByEmail(userLogin.email);

  if (!result || userLogin.password !== result.password) {
    throw new Error401('Incorrect username or password');
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password, ...userInfo } = result;

  const token = jwt.sign({ data: userInfo }, secret, jwtConfig);

  return token;
};

module.exports = {
  add,
  login,
};
