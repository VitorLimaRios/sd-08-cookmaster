const userService = require('../services/userService');

const createUser = async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(result.code).json(result.message);
};

module.exports = {
  createUser,
};
