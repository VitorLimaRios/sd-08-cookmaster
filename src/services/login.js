const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const secret = 'secretPass';
const config = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const validateLogin = (email, password) => {
  if (!email || !password) {
    return 'All fields must be filled';
  }
  return undefined;
};

const login = async (email, password) => {
  const invalid = validateLogin(email, password);
  if (invalid) {
    throw new Error(invalid);
  }
  const findEmail = await UserModel.findEmail(email);
  if (!findEmail || findEmail.password !== password) {
    throw new Error('Incorrect username or password');
  }
  const token = jwt.sign(
    { email, password },
    secret,
    config
  );
  return token;
};

module.exports = {
  login
};
