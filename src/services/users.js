const UserModel = require('../models/User');

const validateUser = (name, email, password, role) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if(!regex.test(email)){
    return 'Invalid entries. Try again.';
  }
  if(!name || !email || !password) {
    return 'Invalid entries. Try again.';
  };
  if(typeof name !== 'string') {
    return 'Invalid entries. Try again.';
  };
  return undefined;  
};

const createUser = async (name, email, password) => {
  const invalid = validateUser(name, email, password);
  if (invalid) {
    throw new Error(invalid);
  }
  const findUser = await UserModel.findEmail(email);
  if (findUser) {
    throw new Error('Email already registered');
  }
  return await UserModel.createUser(name, email, password);
};

module.exports = {
  createUser
};
