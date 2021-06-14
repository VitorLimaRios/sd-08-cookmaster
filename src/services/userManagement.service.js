const { add, exclude, getAll, update, getById } = require('../models/user.model');

exports.createUser = async (entry) => {
  const user = await add({...entry, role: 'user'});
  delete user.password;
  return { user };
};
