const userModel = require('../models/User');

const create = async (newUser) => {
  const createdUser = await userModel.create(newUser);
  if (!createdUser) return null;
  return createdUser;
};

const getUser = async (email) => userModel.getUser(email);

module.exports = {
  create,
  getUser,
};