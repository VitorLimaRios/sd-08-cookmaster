const jwt = require('jsonwebtoken');
const user = require('../models/users');

const secret = 'mypass';

const OK = 200;
const UNAUTHORIZED = 401;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  const getUser = await user.findEmail(email);
  console.log('getUser',getUser);
  if (!getUser || getUser.password !== password) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: getUser }, secret, jwtConfig);
  return res.status(OK).json({ token });
};

module.exports = {
  loginUser,
};