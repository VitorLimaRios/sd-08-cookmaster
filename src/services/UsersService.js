const UsersModel = require('../models/UsersModel');

const isEmailvalid = (value) => {
  const emailRegex = /.+@[A-z]+[.]com/;
  return isValidEmail = emailRegex.test(value);
};

const emailAlreadyExists = async (email) => {
  const users = await UsersModel.getAll();
  return users.some((user) => user.email === email);
};

const create = async (user) => {
  const { name, email, password } = user;
  if(!name || !email || !password || !isEmailvalid(email)) return {
    error: {
      code: 400,
      message: 'Invalid entries. Try again'
    }
  };
  if(emailAlreadyExists(email)) return {
    error: {
      code: 409,
      message: 'Email already registered'
    }
  };
  const newUser = await UsersModel.create(name, email, password);
  return newUser;
};

module.exports = {
  create,
};