const rescue = require('express-rescue');
const userService = require('../services/usersService');
const CREATED_STATUS = 201;

const registerUser = rescue(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const result = await userService.registerUser(name, email, password, role);
  if (result.err) return next(result);
  res.status(CREATED_STATUS).json(result);
});

module.exports = {
  registerUser,
};
