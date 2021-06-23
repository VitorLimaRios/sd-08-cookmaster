const usersModel = require('../models/usersModel');
const userSchema = require('../schema/userSchema');
const { errorGenerator } = require('../utils');

const createUser = async(objDataForCreate) =>{
  const msgError =  userSchema.validateCreate(objDataForCreate);
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

const loginUser = async(objDataForLogin) =>{
  const msgError =  userSchema.validateLogin(objDataForLogin);
  console.log(msgError);
  if(msgError){
    return errorGenerator.unauthorized(msgError);
  }
  return { user: 'deu bom'};
};

const getAll =  () => usersModel.getAll();

module.exports ={
  createUser,
  loginUser,
  getAll,
};
