const usersService = require('../services/users');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 409;

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usersService.create(name, email, password);
    res.status(CREATED).json({ user });
  } catch (e) {
    if (e.message === 'Email already registered') {
      return res.status(CONFLICT).json({ message: e.message });
    }

    return res.status(BAD_REQUEST).json({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.login(email, password);
    res.status(OK).json({ token });
  } catch (e) {
    return res.status(UNAUTHORIZED).json({ message: e.message });
  }
};

module.exports = {
  create,
  login,
};
