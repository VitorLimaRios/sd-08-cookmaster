// services fará a distribuição das regras de negócio;
const usersModel = require('../models/usersModel');
const { errors: { Users:
  { mustHaveEmail, mustHaveName, mustHavePassword, emailMustBeValid, emailMustBeUnique } }
} = require('../utils/errorsNCodes');
const { tokenGenerateForLogin } = require('../utils/tokenation');

const getAllUsers = async () => await usersModel.getAllTheUsers();

const addNewUser = async ({ name, email, password }) => {
  if (!name) throw new Error(JSON.stringify(mustHaveName));
  if (!email) throw new Error(JSON.stringify(mustHaveEmail));
  if (!password) throw new Error(JSON.stringify(mustHavePassword));
  const EMAIL_VALIDATION = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/gi;
  const checkEmailValid = EMAIL_VALIDATION.test(email);
  if (!checkEmailValid) {
    throw new Error(JSON.stringify(emailMustBeValid));
  }
  if (await usersModel.findUserByEmail(email)) {
    throw new Error(JSON.stringify(emailMustBeUnique));
  }
  const addingUser = await usersModel.createNewUser({ name, email, password });
  return addingUser;
};

const loginUser = async (username, password) => {
  return await tokenGenerateForLogin(username, password);
};


module.exports = { addNewUser, getAllUsers, loginUser };
