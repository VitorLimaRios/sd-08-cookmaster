// services é, na maior parte das vezes, a filtragem do models, para entregar a função refinada para o controller 
const usersModel = require('../models/usersModel');

const getAllUsers = async () => await usersModel.getAllTheUsers();

const addNewUser = async (newUser) => {
  const addingUser = { user: await usersModel.createNewUser(newUser) }
  return addingUser
};

const loginUser = async (username, password) => await usersModel.tokenGenerateForLogin(username, password);


module.exports = { addNewUser, getAllUsers, loginUser }
