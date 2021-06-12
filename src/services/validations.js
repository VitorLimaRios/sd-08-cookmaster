const UsersModel = require('../models/UsersModel');
const jwt = require('jsonwebtoken');

const isEmailvalid = (value) => {
  const emailRegex = /.+@[A-z]+[.]com/;
  return isValidEmail = emailRegex.test(value);
};

const emailAlreadyExists = async (email) => {
  const users = await UsersModel.getAll();
  const exists = users.some((user) => user.email === email);
  return exists;
};

const validateJWT = async (token) => {
  try {
    const secret = 'publicSecretParadox';
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.findById(decoded.id);
    if(!user) return {
      error: {
        code: 401,
        message: 'jwt malformed'
      }
    };
    return user;
  } catch (error) {
    return {
      error: {
        code: 401,
        message: error.message
      }
    };
  }
};

module.exports = {
  isEmailvalid,
  emailAlreadyExists,
  validateJWT
};
