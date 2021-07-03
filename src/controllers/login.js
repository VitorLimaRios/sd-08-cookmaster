const rescue = require('express-rescue');
const { findUserByEmail } = require('../services/users');

const STATUS_200 = 200;

const login = rescue(async (req, res) => {
  const { email = '', password = ''} = req.body;
  const user = await findUserByEmail(email, password);
  res.status(STATUS_200).json(user);
});


module.exports = { login };
