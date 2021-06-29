// const usersModel = require('../models/usersModel');
const validateLogin = require('../schema/loginSchema');
const  errorClient  = require('../utils/errorClient');

const loginUser = async(objDataForLogin) =>{
  const errorMessage = validateLogin(objDataForLogin);
  if(errorMessage) return errorClient.unauthorized(errorMessage);
  
  return { user: 'deu bom'};// verificar se precisa disso
};

module.exports ={
  loginUser,
};