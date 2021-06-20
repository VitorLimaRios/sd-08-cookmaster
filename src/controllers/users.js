const users = require('../services/users');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const CREATE = 201;
const UNAUTHORIZED = 401;


const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await users.registerUser(name, email, password);

  if (newUser.err === 'Email already registered') {
    return res.status(CONFLICT).json({ message: newUser.err });
  }

  if (newUser.err) return res.status(BAD_REQUEST).json({ message: newUser.err });
  return res.status(CREATE).json(newUser.data);
};

module.exports = {
  addUser,  
};