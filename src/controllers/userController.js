const userService = require('../services/userService');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const CREATED = 201;

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

module.exports = {
  addUser,
};
