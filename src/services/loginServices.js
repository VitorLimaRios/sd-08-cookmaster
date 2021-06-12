//const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const { code, message } = require('../helpers/messages');

const secret = 'seusecretdetoken';

const SERVER_ERROR = 500;

const JWTConfig = {
  expiresIn: '1d',
  algorithm: 'HS256'
};

const loginService = async (req, res) => {
  
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(code.UNAUTHORIZED).json({ message: 'All fields must be filled'});
  }
  const user = await usersModel.findUserByEmail(email);
  if(!user || user.password !== password) {
    return res.status(code.UNAUTHORIZED)
      .json({ message: 'Incorrect username or password' });
  }

  const login = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(login, secret, JWTConfig);
  return res.status(code.OK).json({ token }); 
};

module.exports = loginService;