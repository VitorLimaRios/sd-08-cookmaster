const UsersModels =require('../models/Users');
const {UNAUTHORIZED}=require('./utils/variableStatus');
const ERROR_USERNAME = {
  error: {
    code: UNAUTHORIZED,
    message: 'Incorrect username or password'
  }};

const login=async(login)=>{
  const {email,password}=login;
  const verifyEmail = await UsersModels.findByEmail(email);
  if(!verifyEmail || verifyEmail.password != password){
    return ERROR_USERNAME; 
  } 
  return verifyEmail;

};
module.exports= {
  login
};