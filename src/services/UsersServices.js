const UsersModel = require('../models/UsersModel');

const create = async (user) => {
  const { name, email, password } = user;

  const newUser = await UsersModel.create(name, email, password);
  return newUser;
};

module.exports = {
  create,
};