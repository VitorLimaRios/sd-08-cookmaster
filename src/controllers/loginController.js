const rescue = require('express-rescue');
const loginService = require('../services/loginService');
const OK_STATUS = 200;

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);
  if(result.err) return next(result);
  res.status(OK_STATUS).json(result);
});

module.exports = {
  login,
};
