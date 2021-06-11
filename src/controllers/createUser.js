const rescue = require('express-rescue');
const UsersService = require('../services/UsersService');

const CREATED = 201;

module.exports = rescue(async(req, res, next) => {
  const user = req.body;
  const newUser = await UsersService.create(user);
  if(newUser.error) {
    const { code, message } = newUser.error;
    return res.status(code).json({ message });
  }
  return res.status(CREATED).json({ user: newUser});
});

