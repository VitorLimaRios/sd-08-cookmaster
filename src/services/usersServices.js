// services é, na maior parte das vezes, a filtragem do models, para entregar a função refinada para o controller 
const usersModel = require('../models/usersModel');

const addNewUser = async (user) => {
  const userName = user.name;
  const verifyExistent = await usersModel.findUserByName(userName);
  if (verifyExistent) return null
  const addingUser = await usersModel.createNewUser(user)
  return addingUser
}


module.exports = { addNewUser }
