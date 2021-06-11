const userModel = require('../models/users');
const validations = require('./validations');
const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

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

const login = async(user) => {
  validations.loginBodyRequest(user);

  const dbUser = await userModel.readByKey('email', user.email);

  validations.loginIsValid(user, dbUser);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256'
  };

  const token = jwt.sign({data: user}, secret, jwtConfig);

  return token;
};

module.exports = {
  readUsers,
  createUser,
  login,
};
