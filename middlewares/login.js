const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');

const OK = 200;
const UNAUTHORIZED = 401;

const secret = 'minhaSenhaCoockmaster';

const login = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256'
  };

  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const data = await usersModel.findEmail(email);
  if (!data || !emailRegex.test(email) || data.password !== password) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }

  const user = {
    name: data.name,
    email,
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(OK).json({ token });
};

module.exports = {
  login,
};
