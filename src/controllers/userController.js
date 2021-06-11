const userService = require('../services/userService');

const CREATED = 201;

const createUser = async (req, res, next) => {
  const newUser = await userService.createUser(req.body);
  console.log(await newUser.error);
  if (newUser.error) return next(newUser);
  res.status(CREATED).json(newUser);
};

module.exports = { createUser };
