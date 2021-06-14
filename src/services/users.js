const UserModel = require('../models/User');

const err = {
  message: ''
};

const nameIsRequired = async (name) => {
  const MIN_LENGTH_NAME = 6;

  if (typeof name !== 'string' || name === '') {
    err.message = 'Invalid entries. Try again.';
    throw new Error(err.message);
  }
};

const emailIsRequired = async (email) => {
  if (!email || email === null) {
    err.message = 'Invalid entries. Try again.';
    throw new Error(err.message);
  }
};

const passwordIsRequired = async (password) => {
  if (!password) {
    err.message = 'Invalid entries. Try again.';
    throw new Error(err.message);
  }
};

const emailAlreadyExists = async (email) => {
  const users = await UserModel.getAllUsers();
  const emailExists = users.find(user => user.email === email);

  if (emailExists) {
    err.code = 409;
    err.message = 'Email already registered';
    throw new Error(err.code, err.message);
  };
};

module.exports = {
  nameIsRequired,
  emailIsRequired,
  passwordIsRequired,
  emailAlreadyExists
};
