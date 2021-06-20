const service = require('../services/Users');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, result } = await service.createUser(newUser);
  return res.status(status).json(result);
};

const login = async (req, res) => {
  const loginData = req.body;
  const { status, result } = await service.login(loginData);
  return res.status(status).json(result);
};

module.exports = { createUser, login };
