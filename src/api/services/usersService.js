const usersModel = require('../models/usersModel');

const createUser = async (data) => {
  data.role = 'user';
  const { ops } = await usersModel.createUser(data);
  const registeredUser = ops[0];
  return registeredUser;
};

module.exports = {
  createUser,
};
