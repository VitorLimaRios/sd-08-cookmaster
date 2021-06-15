const jwt = require('jsonwebtoken');
const usersModels = require('../models/users');

const create = async (name, email, password) => {
  const findEmail=  await usersModels.findByEmail(email);
  if (findEmail) return null;
  const newUser = await usersModels.create(name, email, password);
  delete newUser.password;
  return { user: newUser };
};

module.exports = {
  create,
};
