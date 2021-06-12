const usersServices = require('../services/usersServices');
const { code, message } = require('../helpers/messages');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_CONFLICT = 409;
const STATUS_BAD_REQUEST = 400;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersServices.createUser(name, email, password);
    res.status(code.STATUS_CREATED).json(newUser);
  } catch (error) {
    if (error.message === 'Email already registered') {
      res.status(code.STATUS_CONFLICT).json({ message: error.message });
    }
    res.status(code.STATUS_BAD_REQUEST).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const user = await usersServices.getAllUsers();
    res.status(code.STATUS_OK).json(user);
  } catch (error) {
    res.status(code.STATUS_BAD_REQUEST).json(error.message);
  }
};


module.exports = { createUser, getAllUsers };

