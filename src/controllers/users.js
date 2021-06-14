// const { ObjectId } = require('mongodb');
const UserModel = require('../models/User');
const usersService = require('../services/users');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;
const BAD_REQUEST = 500;

const error = {
  err: {
    message: 'Invalid entries. Try again.'
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await UserModel.getAllUsers();

    res.status(SUCCESS).json({ users });
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.getUserById(id);

//     if (!user) {
//       error.err.message = 'Wrong id format';
//       return res.status(UNPROCESSABLE).json(error);
//     };

//     res.status(SUCCESS).json(user);
//   } catch (err) {
//     res.status(BAD_REQUEST).json({ message: err.message });
//   }
// };

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    await usersService.nameIsRequired(name);
    await usersService.emailIsRequired(email);
    await usersService.emailAlreadyExists(email);
    await usersService.passwordIsRequired(password);

    const newUser = await UserModel.createUser(name, email, password, role);

    res.status(CREATED).json(newUser);
  } catch (err) {
    error.err.message = err.message;
    res.status(UNPROCESSABLE).json(error);
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const { name, quantity } = req.body;
//     const { id } = req.params;

//     await usersService.isValidName(name);
//     await usersService.isValidQuantity(quantity);

//     const user = await UserModel.updateUser(id, name, quantity);

//     res.status(SUCCESS).json(user);
//   } catch (err) {
//     error.err.message = err.message;
//     res.status(UNPROCESSABLE).json(error);
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       error.err.message = 'Wrong id format';
//       return res.status(UNPROCESSABLE).json(error);
//     };

//     await UserModel.deleteUser(id);

//     res.status(SUCCESS).end();
//   } catch (err) {
//     error.err.message = err.message;
//     res.status(UNPROCESSABLE).json(error);
//   }
// };

module.exports = {
  getAllUsers,
  createUser,
  // getUserById,
  // updateUser,
  // deleteUser
};
