const { ObjectId } = require('bson');
const model = require('../models/userModel');

const validateUser = (name, email, password, role) => {
  if(!name) { 
    return 'Invalid entries. Try again.'; 
  };
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if(!email) {
    return 'Invalid entries. Try again.';
  }
  if(!regex.test(email)){
    return 'Invalid entries. Try again.';
  }
  if(!password) {
    return 'Invalid entries. Try again.';
  }
  return undefined;
};

const createUser = async (name, email, password) => {
  const invalid = validateUser(name, email, password);
  if (invalid) {
    throw new Error(invalid);
  }
  const findUser = await model.findUser(email);
  console.log('findUser service:', findUser);
  if (findUser) {
    console.log('entra aquiiiiii');
    throw new Error('Email already registered');
  }
  return await model.createUser(name, email, password);
};

module.exports = {
  createUser,
};
