const UsersModel = require('../models/UsersModel');
const { isEmailvalid, emailAlreadyExists } = require('./validations');

const create = async (user) => {
  const { name, email, password, role } = user;
  if(!name || !email || !password || !isEmailvalid(email)) return {
    error: {
      code: 400,
      message: 'Invalid entries. Try again.'
    }
  };
  const emailExists = await emailAlreadyExists(email);
  if(emailExists) return {
    error: {
      code: 409,
      message: 'Email already registered'
    }
  };
  const newUser = await UsersModel.create(name, email, password, role);
  return newUser;
};

module.exports = {
  create,
};