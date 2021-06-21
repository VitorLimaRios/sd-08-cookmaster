const userModel = require('../models/userModel');

const created = 201;
const error = 400;
const error_unique = 409;
const error_create = 500;

const createUser = async ({ name, email, password }) => {
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !validateEmail.test(email) || !password) {
    return {
      code: error,
      message: {
        message: 'Invalid entries. Try again.'
      }
    };
  }

  const existanteUser = await userModel.getUser(email);

  if (existanteUser) {
    return {
      code: error_unique,
      message: {
        message: 'Email already registered'
      }
    };
  }

  const response = await userModel.createUser({ name, email, password });

  if (response.error) {
    return {
      code: error_create,
      message: {
        message: response.error
      }
    };
  }

  const user = {
    name: response.name,
    email: response.email,
    role: response.role,
    _id: response._id,
  };

  return { code: created, message: { user } };
};

module.exports = {
  createUser,
};
