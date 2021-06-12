// services é, na maior parte das vezes, a filtragem do models, para entregar a função refinada para o controller 
const usersModel = require('../models/usersModel');

const addNewUser = async (user) => {
  const addingUser = await usersModel.createNewUser(user)
  return addingUser
}


module.exports = { addNewUser }
