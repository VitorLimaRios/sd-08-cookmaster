const UserModel = require('../models/userModel');
const Validations = require('./validations');

const create = async (user) => {
  const { name, email, password } = user;
  
  Validations.validateNameIsRequire(name);
  Validations.validatePasswordIsRequire(password);
  Validations.validateEmailIsRequire(email);
  Validations.validateEmailIsValid(email);
  await Validations.validateEmailAlreadyExists(email);

  user.role = 'user';

  const createdUser = await UserModel.create(user);

  delete createdUser['password'];

  return { user: { ...createdUser } };
};

module.exports = {
  create,
};
