const UsersModel = require('../models/UsersModel');

const isEmailvalid = (value) => {
  const emailRegex = /.+@[A-z]+[.]com/;
  return isValidEmail = emailRegex.test(value);
};

const emailAlreadyExists = async (email) => {
  const users = await UsersModel.getAll();
  const exists = users.some((user) => user.email === email);
  console.log('validation exists', exists);
  return exists;
};

module.exports = {
  isEmailvalid,
  emailAlreadyExists,
};
