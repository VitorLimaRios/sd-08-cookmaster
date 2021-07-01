const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const { body } = req;
  const { code, response } = await usersService.createUser(body);
  return res.status(code).json(response);
};

const login = async (req, res) => {
  const { body } = req;
  const { code, response } = await usersService.generateToken(body);
  return res.status(code).json(response);
};

const createAdmin = async (req, res) => {
  const { body } = req;
  const token = req.headers.authorization;
  const { code, response } = await usersService.createAdmin(body, token);
  return res.status(code).json(response);
};

module.exports = {
  createAdmin,
  createUser,
  login,
};
