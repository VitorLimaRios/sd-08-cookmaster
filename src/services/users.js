const UsersModels = require('../models/users');
const { Error400, Error401, Error409 } = require('../errors/');

const isUserValid = async (user) => {
  if (typeof user.name !== 'string') {
    throw new Error400('Invalid entries. Try again.');
  }
  const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (typeof user.email !== 'string' || !validEmailRegex.test(user.email)) {
    throw new Error400('Invalid entries. Try again.');
  }
  const emailAlreadyExists = await UsersModels.findByEmail(user.email);
  if (emailAlreadyExists) {
    throw new Error409('Email already registered');
  }

  if (!user.password) {
    throw new Error400('Invalid entries. Try again.');
  }
};

const isLoginValid = async (userLogin) => {
  if (!userLogin.email || !userLogin.password) {
    throw new Error401('All fields must be filled');
  }

  const dbUser = await UsersModels.findByEmail(userLogin.email);
  
  if (!dbUser || userLogin.password !== dbUser.password) {
    throw new Error401('Incorrect username or password');
  }

  return dbUser;
};

const add = async (user) => {
  await isUserValid(user);

  if (!user.role) {
    user.role = 'user';
  }

  const result = await UsersModels.add(user);
  delete result.password;

  return result;
};

const login = async (userLogin) => {
  const result = await isLoginValid(userLogin);
  delete result.password;

  return result;
};

module.exports = {
  add,
  login
};
