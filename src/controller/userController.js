const userService = require('../services/userService');

const createUser = async (req, res) => {
  const response = await userService.createUser(req.body);
  res.status(response.code).json(response.message);
};

module.exports = {
  createUser,
};
