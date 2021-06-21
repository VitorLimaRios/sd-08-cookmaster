const usersModel = require('../models/usersModel');
const usersSchema = require('../schema/userCreate');
const { errorGenerator } = require('../utils');

const createUser = async(objDataForCreate) =>{
  const msgError =  usersSchema.validateCreateUser(objDataForCreate);
  if(msgError){
    return errorGenerator.badRequest(msgError);
  }

  const { email } = objDataForCreate;
  const emailExistDB = await usersModel.getByEmail(email);
  if(emailExistDB){
    return errorGenerator.conflict('Email already registered');
  }

  const result = await usersModel.createUser({...objDataForCreate, role: 'user'});

  return { user: result};
};

const getAll =  async()=>{
  return usersModel.getAll();
};

module.exports ={
  createUser,
  getAll,
};
