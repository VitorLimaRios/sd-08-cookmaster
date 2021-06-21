const jwt = require('jsonwebtoken');
const model = require('../models/user');

const OK = 200;
const UNAUTH = 401;

const WARNING_ALL_FIELDS = {
  message: 'All fields must be filled'
};
const INCORRECT_USERNAME_PASSWORD = {
  message: 'Incorrect username or password'
};

const loginService = async (req, res) => {
  const { email, password } = req.body;
  (!email || !password) && res
    .status(UNAUTH)
    .json(WARNING_ALL_FIELDS);
  
  const user = await model.getByEmail(email);
  (!user || user.password !== password) && res
    .status(UNAUTH)
    .json(INCORRECT_USERNAME_PASSWORD);
  
  const login = {
    id: user._id,
    email: user.email,
  };
  const secret = 'trybe';
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '1h'  
  };

  const token = jwt.sign(login, secret, jwtConfig);
  return token;
};

module.exports = loginService;