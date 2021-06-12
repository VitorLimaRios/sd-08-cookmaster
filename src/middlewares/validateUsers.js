const validator = require('email-validator');
const user = require('../models/user');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const INVALID = {
  'message': 'Invalid entries. Try again.'
};
const EMAIL_EXISTS = {
  'message': 'Email already registered'
};

const validateUsers = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(BAD_REQUEST).json(INVALID);
  if (!validator.validate(email)) return res.status(BAD_REQUEST).json(INVALID);
  if (await user.findEmail(email)) return res.status(CONFLICT).json(EMAIL_EXISTS);
  next();
};

module.exports = {
  validateUsers
};
