const UserModel = require('../models/user');
const userSchema = require('../schema/user');
const createError = require('../utils/createError');

const serialize = ({ _id, name, email, role }) => ({
  _id,
  name,
  email,
  role
});

const create = async (user) => {
  const { error } = userSchema.validate(user);
  if (error) return createError(error.details[0].message, 'invalid_data');

  const { email } = user;
  const userFoundByEmail = await UserModel.getByEmail(email);
  if (userFoundByEmail) return createError('Email already registered', 'conflict');

  const result = await UserModel.create(user);
  return serialize(result);
};

const getByEmail = async (email) => UserModel.getByEmail(email);

module.exports = {
  create,
  getByEmail
};
