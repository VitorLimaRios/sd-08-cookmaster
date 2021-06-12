const UserModel = require('../models/userModel');
const UserValidations = require('../validations/userValidations');

const create = async (user) => {
  const { name, email, password } = user;
  
  UserValidations.validateNameIsRequire(name);
  UserValidations.validatePasswordIsRequire(password);
  UserValidations.validateEmailIsRequire(email);
  UserValidations.validateEmailIsValid(email);
  await UserValidations.validateEmailAlreadyExists(email);

  user.role = 'user';

  const createdUser = await UserModel.create(user);

  delete createdUser['password'];

  return { user: { ...createdUser } };
};

module.exports = {
  create,
};
