const UserService = require('../services/userService');
const StatusCode = require('../messages/statusCodeMessages');

const CREATED = 201;

const create = async (req, res) => {
  try {
    const user = req.body;
      
    const createdUser = await UserService.create(user);

    res.status(StatusCode.CREATED).json(createdUser);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

const createAdmin = async (req, res) => {
  try {
    const newUserAdmin = req.body;
    const loggedUserRole = req.user.role;
    
    const createdAdmin = await UserService.createAdmin(newUserAdmin, loggedUserRole);

    res.status(StatusCode.CREATED).json(createdAdmin);
  } catch (error) {
    const { code, message } = error;
    res.status(code).json(message);
  }
};

module.exports = {
  create,
  createAdmin,
};
