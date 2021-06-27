const Users = require('../models/Users');

const ERROR_MESSAGE = 'Invalid entries. Try again.';
const BAD_REQUEST = 400;
const CONFLICT = 409;

const emailValidate = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const userValidator = async (user) => {
  if (!user || !user.name || !user.email || !user.password) return {
    error: {
      code: BAD_REQUEST,
      message: ERROR_MESSAGE
    }
  };

  if (!emailValidate(user.email)) return {
    error: {
      code: BAD_REQUEST,
      message: ERROR_MESSAGE
    }
  };

  const userFromDB = await Users.findUser(user);

  if (userFromDB) return {
    error: {
      code: CONFLICT,
      message: 'Email already registered'
    }
  };

  return {
    name: user.name,
    email: user.email,
    role: user.role ? 'admin' : 'user',
  };
};

module.exports = userValidator;