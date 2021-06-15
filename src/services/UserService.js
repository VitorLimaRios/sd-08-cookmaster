const UserModel = require('../models/UsersModel');

const getAllUsers = async () => await UserModel.getAllUsers();

const createUser = async (name, email, password) => {
  const create = await UserModel.createUser(name, email, password);
  return create;
};

module.exports = {
  getAllUsers,
  createUser
};
