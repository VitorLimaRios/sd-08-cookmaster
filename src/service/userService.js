const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const useValidate = require('./userValidations');

const secret = 'mobileLegendIsGood';

const jwtHeader = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const addNewUser = async (data) => {
  const { name, email, password } = data;
  const validations = await useValidate
    .userValidations(name, email, password);

  if (validations) return validations;

  await userModel.addUser(data);

  const getUser = await userModel.getOneUser(email);
  const message = {
    _id: getUser._id,
    name: getUser.name,
    email: getUser.email,
    role: getUser.role,
  };

  return { message, code: 201 };
};

const loginUser = async (user) => {
  const validations = await useValidate.loginIsValidate(user);

  if (validations) return validations;
  
  const { password, ...data } = user;
  const token = jwt.sign({ data: data }, secret, jwtHeader);

  return { message: token, code: 200 };
}

module.exports = {
  addNewUser,
  loginUser,
};
