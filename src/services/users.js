const users = require('../models/users');

const error = require('../helpers/error');
const success = require('../helpers/success');

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validateUserData = async ({ name, email, password }) => {
  if (!name || !email || !password || !validateEmail(email)) {
    throw new Error('Invalid entries. Try again.');
  }
};

const validateNewUser = async ({ email }) => {
  const emailExist = await users.findEmail(email);
  if (emailExist !== null) throw new Error('Email already registered');
};

const registerUser = async (name, email, password, role) => {
  try {
    await validateUserData({ name, email, password });
    await validateNewUser({ email });
  } catch (e) {
    return error(e.message);
  }

  const newUser = await users.addUser(name, email, password, role);
  return success({
    user: {
      name,
      email,
      role: 'user',
      _id: newUser.insertedId,
    },
  });
};

module.exports = {
  registerUser,
};