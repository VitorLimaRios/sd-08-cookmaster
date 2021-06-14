const rescue = require('express-rescue');
const User = require('../../services/users/Users');
const { STATUS_201, STATUS_200 } = require('../../utils/consts');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create(name, email, password);
  return res.status(STATUS_201).json({user: newUser});
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const signIn = await User.login(email, password);
  return res.status(STATUS_200).json({token: signIn});
});

module.exports = {
  create,
  login,
};
