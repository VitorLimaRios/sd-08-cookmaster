const validator = require('email-validator');
const users = require('../models/user');

const BAD_REQUEST = 400;
const CONFLIT = 409;
const INVALID_ENTRIES = {
  'message': 'Invalid entries. Try again.'
};
const EMAIL_EXISTS = {
  'message': 'Email already registered'
};

const validateUsers = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  if (!validator.validate(email)) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  if (await users.findEmail(email)) return res.status(CONFLIT).json(EMAIL_EXISTS);
  next();
};

module.exports = {
  validateUsers
};
