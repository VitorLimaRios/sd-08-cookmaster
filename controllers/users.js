const usersService = require('../services/users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await usersService.createUser(name, email, password);
  res.status(result.code).json(result.message);
};

module.exports = {
  createUser,
};
