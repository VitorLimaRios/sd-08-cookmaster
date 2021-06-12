// services é, na maior parte das vezes, a filtragem do models, para entregar a função refinada para o controller 
const usersModel = require('../models/usersModel');

const getAllUsers = async () => await usersModel.getAllTheUsers();

const addNewUser = async (newUser) => {
  const addingUser = { user: await usersModel.createNewUser(newUser) }
  return addingUser
}


module.exports = { addNewUser, getAllUsers }
