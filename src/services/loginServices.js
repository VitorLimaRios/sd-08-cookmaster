const jwt = require('jsonwebtoken');

const { loginModel } = require('../models');
const {
  findUser,
} = loginModel;

const secret = 'trybecookmaster'; // isso deve ir pro .env

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const makeLogin = async (email, pass) => {
  const validation = await checkUserLogin(email, pass);
  if (validation.message) return validation;

  const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailValidate.test(email))
    return { message: 'Incorrect username or password' };

  const userSearch = await findUser(email);

  if (userSearch) {
    const { password, ...otherInfo } = userSearch;
    if (password !== pass)
      return { message: 'Incorrect username or password' };
  
    const token = jwt.sign({ data: otherInfo }, secret, jwtConfig);

    return { token };
  }

  return { message: 'Incorrect username or password' };
};

const checkUserLogin = async (email, pass) => {
  const invalidEntries = { message: 'All fields must be filled' };

  if (!email || !pass) return invalidEntries;

  return false;
};

module.exports = {
  makeLogin,
};