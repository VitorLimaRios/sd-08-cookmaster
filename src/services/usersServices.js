const usersModels = require('../models/usersModels');
const { status } = require('../schema/status');

const postUser = async (name, email, password) => {
  return await usersModels.registerUser(name, email, password);
};

module.exports = {
  postUser,
};
