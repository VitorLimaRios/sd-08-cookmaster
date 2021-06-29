const usersModel = require('../models/usersModel');
const {validateCreate} = require('../schema/usersSchema');
const  errorClient  = require('../utils/errorClient');

const createUser = async(objDataForCreate) =>{
  const errorMessage = validateCreate(objDataForCreate);
  if(errorMessage) return errorClient.badRequest(errorMessage);

  const { email } = objDataForCreate;
  const emailExistDB = await usersModel.getByEmail(email);
  if(emailExistDB) return errorClient.conflict('Email already registered');

  const result = await usersModel.createUser({...objDataForCreate, role: 'user'});

  return { user: result};
};

module.exports ={
  createUser,
};
