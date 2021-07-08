const Users = require('../services/users');

const CREATED = 201;
const STATUS_OK = 200;

const addUser = async (req, res) => {
  const userInfo = req.body;
  const newUser = await Users.addUser(userInfo);

  if (newUser.err) {
    return res
      .status(newUser.err.status)
      .json({ message: newUser.err.message });
  }

  return res.status(CREATED).json({ user: newUser });
};

const addAdmin = async (req, res) => {
  const newAdminInfo = req.body;
  const { user } = req;

  const newAdmin = await Users.addAdmin(newAdminInfo, user);

  if (newAdmin.err) {
    return res
      .status(newAdmin.err.status)
      .json({ message: newAdmin.err.message });
  }

  return res.status(CREATED).json({ user: newAdmin });
};

const login = async (req, res) => {
  const userInfo = req.body;

  const token = await Users.login(userInfo);

  if (token.err) {
    return res
      .status(token.err.status)
      .json({ message: token.err.message });
  }

  return res.status(STATUS_OK).json({ token });
};

module.exports = {
  addUser,
  addAdmin,
  login,
};
