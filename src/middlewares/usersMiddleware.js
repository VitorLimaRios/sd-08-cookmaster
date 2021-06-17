const UsersModel = require('../models/UsersModel');
const UsersSchema = require('../schema/UsersValidation');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const INVALID_ENTRIES = 'Invalid entries. Try again.';

const validate = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  next();
};

const validateUserEmail = async (req, res, next) => {
  const { email } = req.body;
  const getAllUsers = await UsersModel.getAllUsers();
  const filterEmail = getAllUsers.some((userEmail) => userEmail.email === email);
  if (filterEmail) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

const validateEmailFormat = async (req, res, next) => {
  const { email } = req.body;
  const verifyEmail = await UsersSchema.validateEmail(email);
  if (verifyEmail) {
    return res.status(verifyEmail.STATUS_CODE).json({ message: verifyEmail.message });
  }
  next();
};

module.exports = {
  validate,
  validateUserEmail,
  validateEmailFormat
};
