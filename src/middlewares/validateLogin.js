const validator = require('email-validator');

const AUTH_REQ = 401;
const INVALID = {
  'message': 'All fields must be filled'
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(AUTH_REQ).json(INVALID);
  next();
};

module.exports = {
  validateLogin,
};
