const UsersServices = require('../services/UsersServices');
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQ = 400;
const UN_REQ = 401;
const FORBIDDEN = 403;
const ERR_CONF = 409;

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const addUser = await UsersServices
      .addUser(name, email, password);

    return res
      .status(CREATED).json(
        { user: { name: addUser.name, email: addUser.email, role: addUser.role } }
      );

  } catch (err) {

    if (err.message == 'Email already registered') {

      return res
        .status(ERR_CONF).json({
          message: err.message,
        });
    }

    return res
      .status(BAD_REQ).json({
        message: err.message,
      });
  }
};

// const getAllUsers = async (_req, res) => {
//   try {
//     const users = await UsersServices
//       .getAllUsers();

//     res
//       .status(SUCCESS)
//       .json(users);

//   } catch (err) {
//     res
//       .status(BAD_REQ)
//       .json({ message: err.message });
//   }
// };

const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await UsersServices
      .getLogin(email, password);

    return res
      .status(SUCCESS)
      .json({ token: token });

  } catch (err) {
    return res
      .status(UN_REQ)
      .json({
        message: err.message,
      });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const token = req.headers.authorization;
    const user = await UsersServices
      .addAdmin(name, email, password, token);

    return res
      .status(CREATED)
      .json({ user });
  }
  catch (err) {
    return res
      .status(FORBIDDEN)
      .json({
        message: err.message,
      });
  }
}; 

module.exports = {
  // getAllUsers,
  addUser,
  getLogin,
  addAdmin,
};