const UsersModel = require('../models/UsersModel');

const UNAUTHORIZED = 401;
const errors = {
  incorrect_info: 'Incorrect username or password',
  error_message: 'All fields must be filled'
};

const validateFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: errors.error_message });
  }
  next();
};

const validateEntriesFormat = async (req, res, next) => {
  const { email, password } = req.body;
  const getUser = await UsersModel.getUserByEmail(email);
  if (!getUser) {
    return res.status(UNAUTHORIZED).json({ message: errors.incorrect_info });
  }
  if (getUser.password !== password) {
    return res.status(UNAUTHORIZED).json({ message: errors.incorrect_info });
  }
  next();
};

module.exports = {
  validateFields,
  validateEntriesFormat,
};
