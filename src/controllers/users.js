const jwt = require('jsonwebtoken');
const UsersServices = require('../services/users');

const secret = 'umaSenhaMuitoDoida';
const OK = 200;
const CREATED = 201;

const add = async (req, res) => {
  const { body } = req;

  const result = await UsersServices.add(body);

  return res.status(CREATED).json({ user: result });
};

const login = async (req, res) => {
  const { body } = req;

  const result = await UsersServices.login(body);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: result }, secret, jwtConfig);

  return res.status(OK).json({ token });
};

module.exports = {
  add,
  login,
};
