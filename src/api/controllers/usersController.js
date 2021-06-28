const usersService = require('../services/usersService');
const STATUS = {
  created: 201,
};

const createUser = async (req, res) => {
  const { body } = req;
  const { code, response } = await usersService.createUser(body);
  return res.status(code).json(response);
};

module.exports = {
  createUser,
};
