const UsersModels =require('../models/Users');
const {CONFLICT}=require('./utils/variableStatus');
const ERROR_EMAIL = {
  error: {
    code: CONFLICT,
    message: 'Email already registered'
  }};

const createUsers = async (newUser)=>{
  const {email}=newUser;
  const verifyEmail = await UsersModels.findByEmail(email);
  if(verifyEmail){
    return ERROR_EMAIL; 
  } 
  return UsersModels.createUsers(newUser);
};

module.exports = {
  createUsers
};