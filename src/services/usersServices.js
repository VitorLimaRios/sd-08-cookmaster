// services fará a distribuição das regras de negócio;
const usersModel = require('../models/usersModel');
const { errors: { Users:
  { mustHaveEmail, mustHaveName, mustHavePassword, emailMustBeValid, emailMustBeUnique } }
} = require('../utils/errorsNCodes');

const getAllUsers = async () => await usersModel.getAllTheUsers();

const addNewUser = async ({ name, email, password }) => {
  if (!name) throw new Error(mustHaveName.send.message);
  if (!email) throw new Error(mustHaveEmail.send.message);
  if (!password) throw new Error(mustHavePassword.send.message);
  const EMAIL_VALIDATION = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/gi;
  const checkEmailValid = EMAIL_VALIDATION.test(email);
  if (!checkEmailValid) {
    throw new Error(emailMustBeUnique.send.message);
  }
  if (await usersModel.findUserByEmail(email)) throw new Error(e);
  const addingUser = await usersModel.createNewUser({ name, email, password });
  return addingUser;
};

const loginUser = async (username, password) => {
  return await usersModel.tokenGenerateForLogin(username, password);
};


module.exports = { addNewUser, getAllUsers, loginUser };
