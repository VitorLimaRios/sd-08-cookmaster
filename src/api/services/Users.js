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

const createAdmin = async(newAdmin)=>{

  const {email}=newAdmin;
  const verifyEmail = await UsersModels.findByEmail(email);
  if(verifyEmail){
    return ERROR_EMAIL; 
  } 
  return UsersModels.createUsers(newAdmin,'admin');

};



module.exports = {
  createUsers,
  createAdmin
  
};