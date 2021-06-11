const usersModel = require('../model/usersModel');
const validateEntries = require('./userValidation/validateEntries');

const CONFLICT_STATUS = 409;

const registerUser = async (name, email, password, role) => {
  const isValidEntries = validateEntries(name, email, password);
  if (isValidEntries.err) return isValidEntries;
  const emailAlreadyExists = await usersModel.getUserByEmail(email);
  if (emailAlreadyExists)
    return {
      err: { status: CONFLICT_STATUS, message: 'Email already registered' },
    };
  const response = await usersModel.registerUser(name, email, password, 'user');
  return response;
};

module.exports = {
  registerUser,
};
