// const { ObjectId } = require('mongodb');
// const UserModel = require('../models/User');
const usersService = require('../services/users');

const Ok = 200;
const Created = 201;
// const UnprocessableEntity = 422;
const BadRequest = 400;
const Conflict = 409;
// const InternalServerError = 500;

// const getAllUsers = async (_req, res) => {
//   try {
//     const users = await UserModel.getAllUsers();

//     res.status(SUCCESS).json({ users });
//   } catch (err) {
//     res.status(BAD_REQUEST).json({ message: err.message });
//   }
// };

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
  createUser,
  // getAllUsers,
  // getUserById,
  // updateUser,
  // deleteUser
};
