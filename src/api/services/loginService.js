const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const secret = 'betrybe';

const login = async (email, password) => {
  if (!email || !password)
    return { status: 401, error: { message: 'All fields must be filled' } };

  const user = await usersModel.findByEmail(email);

  if (!user || user.password !== password)
    return { status: 401, error: { message: 'Incorrect username or password' } };

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password: passwordUser, ...userInfo } = user;

  const token = jwt.sign({ data: userInfo }, secret, jwtConfig);

  return { status: 200, data: { token } };
};

module.exports = {
  login,
};
