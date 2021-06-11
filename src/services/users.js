const userModel = require('../models/users');
const validations = require('./validations');

const readUsers = () => userModel.readUsers();

// const readByKey = (key, value) => userModel.readByKey(key, value);

const createUser = async(newUser) => {
  validations.userBodyRequest(newUser);
  
  const user = await userModel.readByKey('email', newUser.email);

  console.log('user no service', user);

  validations.userAlreadyExists(user);

  const created = await userModel.createUser(newUser);

  const { password, ...createdUser } = newUser;

  return {
    ...createdUser,
    role: 'user'
  };
};

module.exports = {
  readUsers,
  createUser,
  // readByKey,
};
