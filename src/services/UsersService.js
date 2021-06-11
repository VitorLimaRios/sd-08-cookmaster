const UsersModel = require('../models/UsersModel');
const { isEmailvalid, emailAlreadyExists } = require('./validations');

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