const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const ok = 200;
const error = 401;
const secret = 'onepiece';

const getToken = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  if (!email || !password) {
    return res.status(error).json({ message: 'All fields must be filled' });
  }

  const validateUser = await userModel.getUser(email);

  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validateUser || !validateEmail.test(email) || validateUser.password !== password)
    return res.status(error).json({ message: 'Incorrect username or password' });

  const user = {
    name: validateUser.name,
    email,
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  res.status(ok).json({ token });
};

module.exports = {
  getToken
};
