const Users = require('../models/users');

const zeroUsers = 0;

const getAll = async () => {
  const allUsers = await Users.getAll();

  if (allUsers.length === zeroUsers) {
    return { message: 'Users not found' };
  }
  return allUsers;
};

const create = async (name, email, password) => {
  const emailExists = await Users.getEmail(email);

  if (emailExists) {
    return null;
  } else {
    const newUser = await Users.create(name, email, password);
    delete newUser.user.password;
    return newUser;
  }
};

module.exports = {
  getAll,
  create
};