const usersServices = require('../services/usersServices');
const { code } = require('../helpers/messages');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersServices.createUser(name, email, password);
    res.status(code.CREATED).json(newUser);
  } catch (error) {
    if (error.message === 'Email already registered') {
      res.status(code.CONFLICT).json({ message: error.message });
    }
    res.status(code.BAD_REQUEST).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const user = await usersServices.getAllUsers();
    res.status(code.OK).json(user);
  } catch (error) {
    res.status(code.BAD_REQUEST).json(error.message);
  }
};


const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // console.log(req.body);
    const newUser = await usersServices.createAdmin(
      name,
      email,
      password,
      role
    );
    res.status(code.CREATED).json(newUser);
  } catch (error) {
    if (error.message === 'Only admins can register new admins') {
      res.status(code.FORBIDDEN).json({ message: error.message });
    }
    res.status(code.BAD_REQUEST).json(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  createAdmin,
};

