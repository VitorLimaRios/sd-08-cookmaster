const Joi = require('joi');
const model = require('../models/usersModel');

const userValidation = (data) => {
  return Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);
};

const singleEmailValidation = async (email) => {
  const response = await model.findSingleEmail(email);
  return response;
};

const addUserService = async ({ name, email, password }) => {
  const { error } = userValidation({ name, email, password });

  if (error) return {
    statusCode: 400,
    json: {
      message: 'Invalid entries. Try again.',
    },
  };

  const singleEmail = await singleEmailValidation(email);
  if (singleEmail) return {
    statusCode: 409,
    json: {
      message: 'Email already registered',
    },
  };

  const response = await model.addUser({ name, email, password });
  return {
    statusCode: 201,
    json: {
      user: {
        name: response.name,
        email: response.email,
        role: response.role,
        _id: response._id
      },
    },
  };
};

module.exports = {
  addUserService,
};
