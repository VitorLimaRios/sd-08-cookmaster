const Joi = require('@hapi/joi');

const userModel = require('../models/userModel');

const validateUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

const createUser = async (userData) => {
  const { error } = await validateUser.validate(userData);
  console.log('service');
  if (error) return {error};
 
  const newUser = await userModel.createUser(userData);

  return newUser;
};

module.exports = { createUser };
