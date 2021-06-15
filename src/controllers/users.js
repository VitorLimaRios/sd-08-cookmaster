const usersService = require('../services/users');
const loginService = require('../services/login');

const Ok = 200;
const Created = 201;
const BadRequest = 400;
const Unauthorized = 401;
const Conflict = 409;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersService.createUser(name, email, password);

    res.status(Created).json(
      { user: { name: newUser.name, email: newUser.email, role: newUser.role } }
    );
  } catch (err) {
    if (err.message === 'Email already registered') {
      return res.status(Conflict).json({
        message: err.message,
      });
    }
    return res.status(BadRequest).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.login(email, password);

    return res.status(Ok).json({ token: token });
  } catch (err) {
    return res.status(Unauthorized).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
  login
};
