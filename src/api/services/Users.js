const Users = require('../models/Users');
const userValidator = require('../utils/userValidator');
const loginValidator = require('../utils/loginValidator');
const jwt = require('jsonwebtoken');

const secret = 'meusegredosupercomlexoqueninguemsabe';

const newUser = async (user) => {
  const userValidation = await userValidator(user);
  if (userValidation.error) return userValidation;
  const { insertedId } = await Users.newUser(user);
  return {
    user: {
      ...userValidation,
      _id: insertedId
    }
  };
};

const login = async (loginData) => {
  const loginValidation = await loginValidator(loginData);
  if (loginValidation.error) return loginValidation;
  
  const jwtConfig = {
    expiresIn: '2d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(loginValidation, secret, jwtConfig);

  return ({ token });
};

module.exports = {
  newUser,
  login
};