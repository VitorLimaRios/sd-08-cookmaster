const usersServices = require('../services/users');

const OK = 200;
const CREATED = 201;

const add = async (req, res) => {
  const { body } = req;

  const result = await usersServices.add(body);

  return res.status(CREATED).json({ user: result });
};

const login = async (req, res) => {
  const { body } = req;

  const token = await usersServices.login(body);

  return res.status(OK).json({ token });
};

module.exports = {
  add,
  login,
};
