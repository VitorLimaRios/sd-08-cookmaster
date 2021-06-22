const checkEmailUsed = require('../models/CheckEmailUsed');
const {
  isValidEmail,
} = require('../utils');

const validateUserData = async ({name, email, password}) => {
  if (!name || !email || !isValidEmail(email) || !password) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  const emailAlreadyUsed = await checkEmailUsed(email);
  if (emailAlreadyUsed) {
    return {status: 409, message: 'Email already registered'};
  }
  return {ok: true};
};

module.exports = validateUserData;