const validator = require('email-validator');

const BAD_REQUEST = 400;
const INVALID_ENTRIES = {
  'message': 'Invalid entries. Try again.'
};

const validateUsers = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  if (!validator.validate(email)) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  next();
};

module.exports = {
  validateUsers
};
