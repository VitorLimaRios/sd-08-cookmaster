const jwt = require('jsonwebtoken');
const LoginModel = require('../models/LoginModel');
const { fieldsMustBeFilled, IncorrectFields } = require('../schemas/ErrosMensages');

const keySectret = '123456';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const ZERO = 0;

const validateEmptyFields = async (email, password) => {

  if(!email || !password) return fieldsMustBeFilled;

  const response = await LoginModel.checkUserInBank(email, password);

  if(response.length === ZERO) return IncorrectFields;
  return true;
};

const createJWT = async (email, password) => {
  try {
    const response = await LoginModel.checkUserInBank(email, password);

    const {password: dbPass, name, ...restInfos} = response[0];
    
    const token = jwt.sign({data: restInfos}, keySectret, jwtConfig);
    return {
      token: token
    };
       
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  validateEmptyFields,
  createJWT,
};
