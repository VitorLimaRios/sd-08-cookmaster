const userModel = require('../models/User');

const create = async (newUser) => {
  const createdUser = await userModel.create(newUser);
  if (!createdUser) return null;
  return createdUser;
};

module.exports = {
  create,
};