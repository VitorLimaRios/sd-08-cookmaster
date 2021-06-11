const userModel = require('../models/users');
const validations = require('./validations');

const readUsers = () => userModel.readUsers();

const createUser = async(newUser) => {
  const userAlreadyExists = await userModel.readUsers();

  validations.validateUser(newUser, userAlreadyExists);

  return userModel.createUser();
};

module.exports = {
  createUser,
  readUsers,
};
