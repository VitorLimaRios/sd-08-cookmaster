const service = require('../services/Users');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, result } = await service.createUser(newUser);
  return res.status(status).json(result);
};

module.exports = { createUser };
