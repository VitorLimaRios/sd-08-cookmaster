const rescue = require('express-rescue');
const User = require('../../services/users/Users');
const { STATUS_201 } = require('../../utils/consts');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.create(name, email, password);
  return res.status(STATUS_201).json({user: newUser});
});

module.exports = {
  create,
};
