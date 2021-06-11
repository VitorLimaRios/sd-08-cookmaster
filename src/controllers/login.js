const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'publicSecretParadox';

const UNAUTHORIZED = 401;
const SERVER_ERROR = 500;
const OK_STATUS = 200;

module.exports = rescue(async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res
      .status(UNAUTHORIZED).json({ message: 'All fields must be filled'});

    const user = await UsersModel.findByEmail(email);
    if(!user || user.password !== password) return res
      .status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });

    const JWTConfig = {
      expiresIn: '7d',
      algorithm: 'HS256'
    };

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, secret, JWTConfig);
    return res.status(OK_STATUS).json({ token });

  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: 'Erro interno no servidor' });
  }
});