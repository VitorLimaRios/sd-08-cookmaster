const Joi = require('joi');
const model = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const secret = 'cookmaster-sd08';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const userValidation = (data) => {
  return Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);
};

const loginValidation = (data) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);
};

const createToken = (user) => {
  const { password, ...otherInfo } = user;
  return jwt.sign({ data: otherInfo }, secret, jwtConfig);
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

const loginServices = async ({ email, password }) => {
  const { error } = loginValidation({ email, password });

  if (error) return {
    statusCode: 401,
    json: {
      message: 'All fields must be filled',
    },
  };

  const userExist = await model.findSingleEmail(email);

  if (!userExist || userExist.password !== password) return {
    statusCode: 401,
    json: {
      message: 'Incorrect username or password',
    },
  };

  const token = createToken(userExist);
  return {
    statusCode: 200,
    json: {
      token
    },
  };
};

const addAdmin = async ({ name, email, password, role = 'admin' }) => {
  const response = await model.addUser({ name, email, password, role });

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
  loginServices,
  addAdmin,
};
