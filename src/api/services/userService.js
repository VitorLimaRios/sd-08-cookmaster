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

const createAdmin = async (newUserAdmin, loggedUserRole) => {
  const { name, email, password } = newUserAdmin;
  
  UserValidations.validateIsUserAdmin(loggedUserRole);
  UserValidations.validateNameIsRequire(name);
  UserValidations.validatePasswordIsRequire(password);
  UserValidations.validateEmailIsRequire(email);
  UserValidations.validateEmailIsValid(email);
  await UserValidations.validateEmailAlreadyExists(email);

  newUserAdmin.role = 'admin';

  const createdAdmin = await UserModel.createAdmin(newUserAdmin);

  delete createdAdmin['password'];

  return { user: { ...createdAdmin } };
};

module.exports = {
  create,
  createAdmin,
};
