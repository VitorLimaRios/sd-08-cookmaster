const valid = require('../validation/user');
const userModel = require('../models/user');

const jwt = require('jsonwebtoken');

const secret = 'senha';
const headers = {
  expiresIn: '7d',
  algorithm: 'HS256'
};

const create = async (name, email, password, role) => {
  const { error } = valid.create.validate({name, email, password});
  if(error) {
    error.message = 'Invalid entries. Try again.';
    error.statusCode = 400;
    throw error;
  };
  const userExists = await userModel.find(email);
  if(userExists) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  };
  const _id = await userModel.create(name, email, password, role);

  return {
    user: {
      name,
      email,
      role,
      _id
    }
  };
};

const find = async (email, password) => {
  const { error } = valid.login.validate({email, password});
  if(error) {
    error.message = 'All fields must be filled';
    error.statusCode = 401;
    throw error;
  };
  const user = await userModel.find(email, password);
  if(!user) {
    const error = new Error('Incorrect username or password');
    error.statusCode = 401;
    throw error;
  }
  const token = jwt.sign(user, secret, headers);
  return {
    token
  };
};

module.exports = {
  create,
  find
};
