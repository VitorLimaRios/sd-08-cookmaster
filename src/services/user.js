const UserModel = require('../models/user');
const UserSchema = require('../schema/user');
const {apiResponse, customError } = require('../utils/index');

const createUser = async (user) => {
  console.log(user);
  const { error } = UserSchema.validate(user);
  console.log(error);
  if (error) return customError('Invalid entries. Try again.', 'invalid_data');

  const { email } = user;
  const userFoundByEmail = await UserModel.getUserByEmail(email);
  if (userFoundByEmail) return customError('Email already registered', 'conflict');

  const result = await UserModel.createUser(user);
  return apiResponse(result);
};

const getByEmail = async (email) => UserModel.getUserByEmail(email);

module.exports = {
  createUser,
  getByEmail
};