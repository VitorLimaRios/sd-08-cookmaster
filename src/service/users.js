const usersModels = require('../models/users');

const create = async (name, email, password) => {
  const findEmail=  await usersModels.findByEmail(email);
  if (findEmail) return null;
  const newUser = await usersModels.create(name, email, password);
  return newUser;
};

const login = async (email, password) => {

};

module.exports = {
  create,
  login,
};
