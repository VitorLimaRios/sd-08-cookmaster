const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const OK = 200;
const UNAUTHORIZED = 401;

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const secret = 'segredosecreto';

const getToken = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  if (!email || !password)
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });

  const validUser = await User.findUser(email);

  if (!validUser || !validEmail.test(email) || validUser.password !== password)
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });

  const user = {
    name: validUser.name,
    email,
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  res.status(OK).json({ token });
};

module.exports = getToken;