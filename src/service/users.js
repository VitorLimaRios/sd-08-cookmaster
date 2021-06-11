const usersModels = require('../models/users');

const create = async (name, email, password) => {
  const findByName =  await usersModels.findByEmail(email);
  if (findByName) return null;
  const newUser = await usersModels.create(name, email, password);
  return newUser;
};

module.exports = {
  create
};
