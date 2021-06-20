const { validateCredentials } = require('./utils/validateCredentials');
const Model = require('../models/users');

const invalidEntries = 'Invalid entries. Try again.';
const emailRegistered = 'Email already registered';

const createUser = async (name, email, password) => {
  console.log('SERVICE req.body', name, email, password);

  const { error: validationError } = validateCredentials({ name, email, password });
  if (validationError) return { message: invalidEntries };

  const userAlreadyExist = await Model.findUser(email);
  if (userAlreadyExist) return { message: emailRegistered };

  return await Model.createUser(name, email, password);
};

module.exports = {
  createUser,
};
