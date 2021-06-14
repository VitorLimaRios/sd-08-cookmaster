const Joi = require('@hapi/joi');

const userModel = require('../models/userModel');

const validateSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const validateSignIn = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

const createUser = async (userData) => {
  const { error } = validateSignUp.validate(userData);
  if (error) return { bad_request: true };

  const user = await userModel.getUserByEmail(userData.email);
  if (user) return { conflict: true };
 
  const newUser = await userModel.createUser(userData);
  return newUser;
};

const userLogin = async (login) => {
  const { error } = validateSignIn.validate(login);
  if (error) return { missing_fields: true };

  const user = await userModel.getUserByEmail(login.email);
  if (!user || user.password !== login.password) return { incorrect_fields: true };

  return user;
};

module.exports = { createUser, userLogin };
