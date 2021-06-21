const userService = require('../services/userService');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const CREATED = 201;
const OK = 200;
const UNAUTHORIZED = 401;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await userService.add(name, email, password);

  if (newUser === undefined) {
    res.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (newUser === null) {
    res.status(CONFLICT).json({
      message: 'Email already registered',
    });
  }

  if (newUser !== null && newUser !== undefined) {
    const { password: pass, ...user } = newUser;
    return res.status(CREATED).json({ user });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loggedUser = await userService.login(email, password);

  if (loggedUser === undefined) {
    res.status(UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }
  if (loggedUser === 'not') {
    res.status(UNAUTHORIZED).json({
      message: 'Incorrect username or password',
    });
  }

  if (loggedUser !== undefined && loggedUser !== 'not') {
    return res.status(OK).json({
      token: loggedUser,
    });
  }
};

module.exports = {
  addUser,
  loginUser,
};
