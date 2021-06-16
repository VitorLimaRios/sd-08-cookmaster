const LoginSchema = require('../schema/LoginValidation');

const UNAUTHORIZED = 401;
const error_message = 'All fields must be filled';

const validateFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: error_message });
  }
  next();
};

const validateEmailFormat = async (req, res, next) => {
  const { email } = req.body;
  const verifyEmail = await LoginSchema.validateEmail(email);
  if (verifyEmail) {
    return res.status(verifyEmail.UNAUTHORIZED).json({ message: verifyEmail.message });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  const verifyPassword = await LoginSchema.validatePassword(password);
  if (verifyPassword) {
    return res.status(verifyPassword.UNAUTHORIZED)
      .json({ message: verifyPassword.message });
  }
  next();
};

module.exports = {
  validateFields,
  validateEmailFormat,
  validatePassword
};
