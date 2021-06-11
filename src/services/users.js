const userModel = require('../models/users');

const readUsers = () => userModel.readUsers();

const createUser = async(newUser) => {
  const userAlreadyExists = await userModel.readUsers();
};

module.exports = {
  createUser,
  readUsers,
};
