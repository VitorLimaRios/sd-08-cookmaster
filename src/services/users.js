const UserSchema = require('../schema/users');
const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');

const secret = 'senhasecretamentedificil';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256'
};

const create = async (name, email, password, role) => {
  const { error } = UserSchema.create.validate({name, email, password});
  if(error) {
    error.message = 'Invalid entries. Try again.';
    error.statusCode = 400;
    throw error;
  };
  const userExists = await UserModel.findUserByEmail(email);
  if(userExists) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  };
  const user = await UserModel.create(name, email, password, role);
  const { _id } = user;

  return {
    user: {
      name,
      email,
      role,
      _id
    }
  };
};


const findUserByEmail = async (email, password) => {
  const { error } = UserSchema.login.validate({email, password});
  if(error) {
    error.message = 'All fields must be filled';
    error.statusCode = 401;
    throw error;
  };
  const user = await UserModel.findUserByEmail(email, password);
  if(!user) {
    const error = new Error('Incorrect username or password');
    error.statusCode = 401;
    throw error;
  }
  const { name, password: DBPass, ...moreInfos } = user;
  const token = jwt.sign({ data: moreInfos }, secret, jwtConfig);
  return {
    token
  };
};

module.exports = {
  create,
  findUserByEmail
};
