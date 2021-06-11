const BAD_REQUEST = 400;
const INVALID_ENTRIES = {
  'message': 'Invalid entries. Try again.'
};

const testEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const validateUsers = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  if (!testEmail(email)) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  next();
};

module.exports = {
  validateUsers
};
